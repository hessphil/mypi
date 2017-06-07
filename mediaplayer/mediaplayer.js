/**
 @constructor
 @abstract
 */
var Playable = function(data) {
    if (this.constructor === Playable) {
      throw new Error("Can't instantiate abstract class!");
    }
	this.data=data;
	this.view=null;
};

/**
 @abstract
 */
Playable.prototype.data = "";

/**
 @abstract
 */
Playable.prototype.getData = function() {
    return this.data;
}


/**
 @abstract
 */
Playable.prototype.play = function() {
    return null;
}

/**
 @abstract
 */
Playable.prototype.stop = function() {
    return null;
}

/**
 @abstract
 */
Playable.prototype.pause = function() {
    return null;
}

/**
 @abstract
 */
Playable.prototype.resume = function() {
    return null;
}

/**
 @abstract
 */
Playable.prototype.getView = function() {
    return this.view? this.view:'';
}


var News = function(text) {
    Playable.apply(this, [text]);
};
News.prototype = Object.create(Playable.prototype);
News.prototype.constructor = News;
News.prototype.data="";
News.prototype.play = function() {
	return null;
}
News.prototype.stop = function() {
	return null;
}
News.prototype.pause = function() {
	return null;
}
News.prototype.resume = function() {
	return null;
}
News.prototype.getView = function() {
	return null;
}

class Mediaplayer{ 
	constructor(id,apikey) {
		this.id=id;
		this.apikey=apikey;
		this.playables=[];
		this.soundVolume=10;
		this.positionPoll=null;
		this.currentPlayable=null;
	}

	play() {
		console.log(this.id + ' plays.');

		if(this.currentPlayable==null)
		{
			if(this.playables.length > 0)
			{
				// save it first temporarily becuase maybe we have to 
				var nextPlayable=this.playables.shift();
				
				if (nextPlayable instanceof News)
				{
					var parameters = {
						onend: this.skip.bind(this)
					}
					
					responsiveVoice.speak(nextPlayable.data,"Deutsch Female",parameters);
					this.currentPlayable=nextPlayable;
				}
			}
		} 
	}
	  
	pause() {
		if (this.currentPlayable instanceof News)
		{
				
			responsiveVoice.pause();
		}
	}	
	  
	resume() {
		if (this.currentPlayable instanceof News)
		{
			responsiveVoice.resume();
		}
	}
	  
	stop() {
		if (this.currentPlayable instanceof News)
		{
			responsiveVoice.cancel();
			
		}
		this.currentPlayable=null;
	}
	
	skip() {
		var nextPlayable=this.playables.shift();
		
		if (nextPlayable instanceof News)
		{
			var parameters = {
				onend: this.skip.bind(this)
			}
			
			responsiveVoice.speak(nextPlayable.data,"Deutsch Female",parameters);
			this.currentPlayable=nextPlayable;
		}
		
	}
	
	addPlayable(playable) {
		if(playable instanceof Playable)
		{
			this.playables.push(playable);
			console.log(this.playables.length);
		} 
		else
		{
			console.log('Cannot add non Playable object');
		}
	}
}

