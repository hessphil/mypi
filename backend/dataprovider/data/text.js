'use strict';

const Playable = require('./playable.js');

class Text extends Playable {
	constructor(text) {
		if (this.constructor === Text) {
			throw new Error("Can't instantiate abstract class!");
		}
		
		super();
		this.text = text
	}
	
	play()
	{
		super.play()
	}
	
	stop()
	{
		super.stop()
	}
	
	pause()
	{
		super.pause()
	}
	
	resume()
	{
		super.resume()
	}
	
	getView()
	{
		super.getView()
	}
}

module.exports = Text;
