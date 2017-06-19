class Controller { 
	constructor() {
		this.counter=0;
	}
	
	httpGet(theUrl) {
		var xmlHttp = new XMLHttpRequest();
		console.log(theUrl)
		xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
		xmlHttp.send( null );
		return xmlHttp.responseText;
	}
	
	getPlayablesFromServer() {
		// Read the API token from Cookie
		// Query data until we get a valid response
		var x = document.cookie
		var url = "http://localhost:8080/getNews/" + x.split("=")[1];
		var jsonNewsTest = JSON.parse(this.httpGet(url));
		//console.log(jsonNewsTest);
		return jsonNewsTest;
	}
	
	insertAfter(newElement,targetElement) {
			// target is what you want it to go after. Look for this elements parent.
			var parent = targetElement.parentNode;

			// if the parents lastchild is the targetElement...
			if (parent.lastChild == targetElement) {
				// add the newElement after the target element.
				parent.appendChild(newElement);
			} else {
				// else the target has siblings, insert the new element between the target and it's next sibling.
				parent.insertBefore(newElement, targetElement.nextSibling);
			}
		}
		
	addPlayableDiv(img_url,content) {
		var div = document.createElement('div');
		var img = document.createElement('img');
		var div_detail = document.createElement('div');
		var img_src = document.createElement('img');
		var strong = document.createElement('strong');
		
		if(content.length> 32)
		{
			content = content.substring(0,32);
		}
		
		img.src=img_url;
		img.className="preview-img";
		
		div_detail.className="details";
		
		strong.innerHTML=content;
		div_detail.appendChild(strong);
		
		img_src.src="../pics/spiegel.svg";
		img_src.className="pull-right preview-src-spiegel";
		
		if(this.counter%2==0)
		{
			div.className="playable equal";
		}
		else
		{
			div.className="playable";
		}
		div.appendChild(img);
		div.appendChild(div_detail);
		div.appendChild(img_src);
		
		var parent = document.getElementById('playCon');
		this.insertAfter(div, parent.lastChild);
		this.counter++;
	}
	
	removePlayableDiv(){
		
		var parent = document.getElementById('playCon');
		parent.removeChild(parent.childNodes[0]);
		this.counter--;
	}

	queryAndInsert(){
		var playables;
		playables=this.getPlayablesFromServer();
		for (var pl=0;pl<playables.length;pl++)
		{
			console.log(playables[pl].imageUrl);
			this.addPlayableDiv(playables[pl].imageUrl,playables[pl].title);
		}
		return playables;
	}
}


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
	constructor(id,apikey,controller) {
		this.id=id;
		this.apikey=apikey;
		this.playables=[];
		this.soundVolume=10;
		this.positionPoll=null;
		this.currentPlayable=null;
		this.controller=controller;
		console.log(this.controller);
		this.getPlayables();
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
	
	getPlayables() {
		var playables=this.controller.queryAndInsert();
		console.log(playables)
		for (var pl=0;pl<playables.length;pl++)
		{
			this.addPlayable(new News(playables[pl].title + "." + playables[pl].text));
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

