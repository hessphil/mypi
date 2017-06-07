'use strict';

const Playable = require('./playable.js');

class Song extends Playable {
	constructor(title,genre,interpret,source,imageUrl) {
		if (this.constructor === Song) {
			throw new Error("Can't instantiate abstract class!");
		}
		
		super();
		
		this.title = title
		this.genre = genre
		this.interpret = interpret
		this.source = source
		this.imageUrl = imageUrl
	}
}

module.exports = Song;
