# (M)ERN Template

## About

This is a template for my future MERN projects. Specifically "ERN", Mongodb later.

1. It Has basic necessities for React.js, and it's testing.
2. And, Express.js for back-end code.

## Script Details

### Install Script

> npm install

Installs dependencies.

### Development Script

> npm start

Starts the Dev build.
Concurrently start the server and the single page app or client. Client must have the proxy(in package.json) set to server's
port

### Build Script

.env file > NODE_ENV=production

To build the client:
> npm run build

Build script used by Heroku:
> npm heroku-postbuild

### Test Script

> npm test

Tests the client-side App.

## Notes: