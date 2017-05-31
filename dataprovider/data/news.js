'use strict';


const Text = require('./text.js');

class News extends Text {
	constructor(title,text,provider,source,imageUrl) {
		super(text);
		this.title = title
		this.provider = provider
		this.source = source
		this.imageUrl = imageUrl
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

module.exports = News;
