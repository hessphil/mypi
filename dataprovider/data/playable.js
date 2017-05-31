'use strict';

class Playable {
	constructor() {
		if (this.constructor === Playable) {
			throw new Error("Can't instantiate abstract class!");
		}
	}
	
	play()
	{
		
	}
	
	stop()
	{
		
	}
	
	pause()
	{
		
	}
	
	resume()
	{
		
	}
	
	getView()
	{
		
	}
}

module.exports = Playable;