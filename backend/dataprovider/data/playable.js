'use strict';

class Playable {
	constructor() {
		if (this.constructor === Playable) {
			throw new Error("Can't instantiate abstract class!");
		}
		
		// initialize callback methods
		this.onPlay={}
		this.onEnd={}
		this.onStop={}
		this.onPause={}
		this.onResume={}
		
		this.volume=1
		
		this.isPlaying=false
	}
}

module.exports = Playable;