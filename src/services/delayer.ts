export class Delayer {
  private promiseResolveQueue: { resolveFunc: (value: unknown) => void; promise: Promise<unknown> }[] = [];

  private alreadyExecuting = false;

  private delayMs: number;

  constructor(delayMs: number) {
    this.delayMs = delayMs;
  }

  public execute<T>(callback: () => T | Promise<T>): Promise<T> {
    let resFunc: (value: unknown) => void;

    // This promise will resolve when resolveFunc is called, not necessarily
    // from within the executor's scope (the function passed to the constructor).
    // Therefore, we put resolveFunc in the execution queue promiseResolveQueue
    // and start the call chain
    const promise = new Promise(
      (resolveFunc) => (resFunc = resolveFunc)
    ).then(() => callback());

    this.promiseResolveQueue.push({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      resolveFunc: resFunc,
      promise: promise,
    });
    this.startQueueExecution();
    return promise;
  }

  private startQueueExecution() {
    if (this.alreadyExecuting) {
      return;
    }
    this.alreadyExecuting = true;
    this.executeNextInQueue();
  }

  /* This function is the one managing the schedueler.
   * It should execute the current task and schedule a call to itself delayMs later
   * It should handle events added after the last item is executed and before the delayMs is elapsed (I don't know exactly how at the moment)
   */
  private executeNextInQueue() {
    if (this.promiseResolveQueue.length > 0) {
      const promise = this.promiseResolveQueue.shift();
      if (promise === undefined) {
        throw new Error('no element in promise queue'); // This should never be raised
      }
      promise.promise
        .then(() => this.wait(this.delayMs))
        .then(() => this.executeNextInQueue());

      promise.resolveFunc(null);
    } else {
      // we already waited after the last call, and we know the queue to be empty, so we can safely reset the executing flag
      this.alreadyExecuting = false;
    }
  }

  /* Returns a promise that completes after delayMs milliseconds and returns nothing
  */
  private wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

}
