'use strict';

const Playable = require('./playable.js');

class Song extends Playable {
	constructor(title,genre,interpret,source,imageUrl,songUrl,duration) {
		if (this.constructor === Song) {
			throw new Error("Can't instantiate abstract class!");
		}
		
		super();
		
		this.title = title
		this.genre = genre
		this.interpret = interpret
		this.source = source
		this.imageUrl = imageUrl
		this.songUrl = songUrl
		this.duration = duration
	}
}

module.exports = Song;
