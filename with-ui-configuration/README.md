## Implementation of Shaka Player in ReactJS with UI configuration

This is simple ReactJS app with implementation of shaka player with UI configuration. In this app, we are using shaka player and see how we can configure shaka player UI the easy way.

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

		//Setting UI configuration JSON object
		const uiConfig = {};

		//Configuring elements to be displayed on video player control panel
		  uiConfig['controlPanelElements'] = ['mute', 'volume', 'time_and_duration', 'fullscreen', 'overflow_menu', ];
		  
		//Setting up shaka player UI configuration
      	const ui = new shaka.ui.Overlay(player, videoContainer, video, uiConfig);
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
		Returning video with a container. Remember, when setting up shaka player with custom UI, you must
		add your video component inside a container
		The container will be used by shaka player to add your customized UI for the player
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

## More about video player control panel customization

The following elements can be added to the UI bar using this configuration value:

* **time_and_duration:** adds an element tracking and displaying current progress of the presentation and the full presentation duration in the "0:10 / 1:00" form where "0:10" (ten seconds) is the number of seconds passed from the start of the presentation and "1:00" (one minute) is the presentation duration.

* **play_pause:** adds a button that plays/pauses the video on click.

* **mute:** adds a button that mutes/unmutes the video on click.

* **volume:** adds a volume slider.

* **fullscreen:** adds a button that toggles full screen mode on click.

* **overflow_menu:** adds a button that opens an overflow menu with additional settings buttons. It's content is also configurable.

* **rewind:** adds a button that rewinds the presentation on click; that is, it starts playing the presentation backwards.

* **fast_forward:** adds a button that fast forwards the presentation on click; that is, it starts playing the presentation at an increased speed

* **spacer:** adds a chunk of empty space between the adjacent elements.

## More on configuring overflow menu of shaka player

Similarly, the 'overflowMenuButtons' configuration option can be used to control the contents of the overflow menu. The following buttons can be added to the overflow menu:

* **captions:** adds a button that controls the current text track selection (including turning it off). The button is visible only if the content has at least one text track.

* **cast:** adds a button that opens a Chromecast dialog. The button is visible only if there is at least one Chromecast device on the same network available for casting.

* **quality:** adds a button that controls enabling/disabling of abr and video resolution selection.

* **language:** adds a button that controls audio language selection.

* **picture_in_picture:** adds a button that enables/disables picture-in-picture mode on browsers that support it. Button is invisible on other browsers.



**Note -** For more details on shaka player, follow the documentation provided -
https://shaka-player-demo.appspot.com/docs/api/index.html
Remember that the documentation refer to JavaScript implementation of shaka player, implementation method may differ for ReactJS but APIs will be same.
