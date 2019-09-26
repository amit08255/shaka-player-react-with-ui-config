import React from 'react';
import shaka from 'shaka-player';

class VideoPlayer extends React.PureComponent{

	constructor(props){

		super(props);

		this.videoComponent = React.createRef();

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

		var manifestUri = 'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd';

		const video = this.videoComponent.current;

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