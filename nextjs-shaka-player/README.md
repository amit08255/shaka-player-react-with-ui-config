# shaka player implementation with NextJS

This simple project contains basic implementation of shaka player with NextJS. Since NextJS has built-in support for SSR, and shaka player doesnt support it, you need to load shaka player with - 

```js
import dynamic from 'next/dynamic';
```

With it you can import JavaScript modules (inc. React Components) dynamically and work with them. They also work with SSR. You can think of dynamic imports as another way to split your code into manageable chunks.

`containers/Tutorial.js` loads shaka player with video from props. We are loading this container dynamically in our index page so that shaka player is loaded without any issue with SSR.


## Installing app

Before using this app, you need to install dependencies. Use below command to install dependencies -

```sh
npm install
```

## Starting app

To use this app, use below command -

```sh
npm run dev
```

It will start our app which can be accessed in browser at - http://localhost:3000
