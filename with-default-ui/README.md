## Implementation of Shaka Player in ReactJS with default UI

This is simple ReactJS app with default shaka player UI which includes features like video quality control, volume bar, mute button, video time and duration, overlay menu.

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

/*
If you are using server-side rendering, remember that this component should be loaded on client-side
shaka player needs to be loaded on client-side, loading it on server-side may lead to error or undesired results
*/


/*
importing dependencies and CSS file(s) required for UI customization
*/
import React from 'react';
import 'shaka-player/dist/controls.css';
const shaka = require('shaka-player/dist/shaka-player.ui.js');

//Creating class component
class VideoPlayer extends React.PureComponent{

	constructor(props){

		super(props);

		//Creating reference to store video component on DOM
		this.videoComponent = React.createRef();

		//Creating reference to store video container on DOM
		this.videoContainer = React.createRef();

		//Initializing reference to error handlers
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

	componentDidMount(){

		//Link to MPEG-DASH video
		var manifestUri = 'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd';

		//Getting reference to video and video container on DOM
		const video = this.videoComponent.current;
		const videoContainer = this.videoContainer.current;

		//Initialize shaka player
		var player = new shaka.Player(video);
		  
		//Setting up shaka player UI
      	const ui = new shaka.ui.Overlay(player, videoContainer, video);
      	ui.getControls();

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

		/*
		Returning video with a container which is required to load shaka player UI.
		*/
		return(
			<div className="video-container" ref={this.videoContainer}>
				<video 
					className="shaka-video"
					ref={this.videoComponent}
					poster="//shaka-player-demo.appspot.com/assets/poster.jpg"
				/>
			</div>
		);
	}
}

export default VideoPlayer;
```


**Note -** For more details on shaka player, follow the documentation provided -
https://shaka-player-demo.appspot.com/docs/api/index.html
Remember that the documentation refer to JavaScript implementation of shaka player, implementation method may differ for ReactJS but APIs will be same.
