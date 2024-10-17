# magus-library
A utilitarian library for Scryfall ant MTG-related projects


## Deploying
1. Update version number in `package.json`
2. Push to `origin/main`
3. Checkout branch `origin/minified`
4. Merge `origin/main` into `minified`
5. Run `npm run bundle`
6. Commit with a message of the format `v<VesrionNumber>`
7. Tag this commit with the version number (without "v")
8. Push to `origin/minified`
