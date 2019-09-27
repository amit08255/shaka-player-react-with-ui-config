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