## Basic implementation of Shaka Player in ReactJS

This is simple ReactJS app with basic implementation os shaka player. In this app, we are just loading a simple video in shaka player in our app.

## Installing app

Before using this app, you need to install dependencies. Use below command to install dependencies -

```sh
npm install
```

## Starting app

To use this app, use below command -

```sh
npm start
```

It will start our app which can be accessed in browser at - http://localhost:3000


# Internal details

Read further details to know how you can implement shaka player in your ReactJS app.

**Note** - Remember, if your ReactJS app uses server-side rendering, you must always load your shaka player component on client side.

## Adding shaka player in your React app

For using shaka player in your app, you need to install shaka-player using command -

```sh
npm install --save shaka-player
```

## Simple React component with shaka player

```js

//importing dependencies

import React from 'react';
import shaka from 'shaka-player';


//Creating class component

class VideoPlayer extends React.PureComponent{

	constructor(props){

		super(props);

        //Creating reference which will allow access to video player on DOM
		this.videoComponent = React.createRef();

        //Adding reference to event handler functions
		this.onErrorEvent = this.onErrorEvent.bind(this);
		this.onError = this.onError.bind(this);
	}

	onErrorEvent(event) {
	  // Extract the shaka.util.Error object from the event.
	  this.onError(event.detail);
	}

	onError(error) {
	  // Log the error.
	  console.error('Error code', error.code, 'object', error);
	}

    //Initialize your shaka player here
	componentDidMount(){

        //MPEG-DASH video URL
		var manifestUri = 'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd';

        //Reference to our video component on DOM
		const video = this.videoComponent.current;

        //Initializing our shaka player
		var player = new shaka.Player(video);

		// Listen for error events.
  		player.addEventListener('error', this.onErrorEvent);

  		// Try to load a manifest.
	  	// This is an asynchronous process.
	  	player.load(manifestUri).then(function() {
		    // This runs if the asynchronous load is successful.
		    console.log('The video has now been loaded!');
	  	}).catch(this.onError);  // onError is executed if the asynchronous load fails.

	}

	render(){


        /*Returning video component. Shaka player will be added to this component
            once its mounted on DOM
        */
		return(
				<video 
					width="640"
					ref={this.videoComponent}
					poster="//shaka-player-demo.appspot.com/assets/poster.jpg"
					controls
				/>
		);
	}
}

export default VideoPlayer;
```
