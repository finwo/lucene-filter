# rpc-duplex

[![NPM](https://nodei.co/npm/rpc-duplex.png)](https://nodei.co/npm/rpc-duplex/)

> Streamed RPC library for both Node.JS and the browser

## Important notes

This implementation **DOES NOT** follow the [msgpack-rpc][msgpack-rpc] specification. It intends to provide a stable
stand-alone solution for remote-procedure-calling over websockets in both Node.JS and the browser.

The protocol is **NOT** versioned (yet), updates may break your application until it is. No major version will be
released until the protocol is versioned & updates should not break applications.

## Install

```bash
npm install --save rpc-duplex
```

## Usage

### Node.JS

```js
const rpc = require('rpc-duplex');

// Creating a provider
const provider = rpc({}, {
  capitalize( str ) {
    return str.toUpperCase();
  },
  throwError( arg ) {
    throw new Error(arg);
  }
});

// Creating a consumer
const consumer = rpc();

// Connect consumer & provider
// Normally this goes through a network of sorts
provider.pipe(consumer).pipe(provider);

// Use provided functions
const remote = rpc.remote(consumer);

// Go async so you can copy-paste this code
(async () => {
  
  // Wait for functions to appear
  while(remote.capitalize) await new Promise(r=>setTimeout(r,100));
  
  // Call a remote function
  let result = await remote.capitalize('foobar');
  console.log(result); // FOOBAR
  
  // Errors are re-thrown
  try {
    await remote.throwError('hello world');    
  } catch(e) {
    console.log(e.message); // hello world
  }
  
})();
```

### Browser

Browser usage is possible through the use of [browserify][browserify].

This package makes use of ES6 features. If you want to use this module in older browsers you'll need to use a plugin
like [esmify][esmify] to ensure it works.

## TODO

- version the protocol
- document the resulting protocol (like a spec)
- automatic reconnect?

[browserify]: https://npmjs.com/package/browserify
[esmify]: https://npmjs.com/package/esmify
[msgpack-rpc]: https://github.com/msgpack-rpc/msgpack-rpc
