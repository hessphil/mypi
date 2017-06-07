'use strict';

class Playable {
	constructor() {
		if (this.constructor === Playable) {
			throw new Error("Can't instantiate abstract class!");
		}
	}
}

module.exports = Playable;