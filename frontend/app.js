class Controller { 
	constructor() {
		this.counter=0;
		this.scrollPos=0;
	}
	
	httpGet(theUrl) {
		var xmlHttp = new XMLHttpRequest();
		console.log(theUrl)
		xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
		xmlHttp.send( null );
		return xmlHttp.responseText;
	}
	move_down() {
		document.getElementById('playCon').scrollTop = (this.scrollPos+100);
		this.scrollPos = document.getElementById('playCon').scrollTop;
	}

	move_up() {
		document.getElementById('playCon').scrollTop -= 100;
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
		
	addPlayableDiv(img_url,content,NewsProvider) {
		var div = document.createElement('div');
		var img = document.createElement('img');
		var div_detail = document.createElement('div');
		var img_src = document.createElement('img');
		var strong = document.createElement('strong');
		
		
		img.src=img_url;
		img.className="preview-img";
		
		div_detail.className="details";
		
		strong.innerHTML=content;
		div_detail.appendChild(strong);
		
		if(NewsProvider === 'spiegel-online'){
			img_src.src="../pics/spiegel.svg";
			img_src.className="pull-right preview-src-spiegel";
		}
		else if(NewsProvider === 'focus'){
			img_src.src="../pics/focus.svg";
			img_src.className="pull-right preview-src-focus";
		}
		else if (NewsProvider === 'die-zeit'){
			img_src.src="../pics/Zeit.svg";
			img_src.className="pull-right preview-src-zeit";
		}
		else if (NewsProvider === 'deezer'){
			img_src.src="../pics/deezer.svg";
			img_src.className="pull-right preview-src-deezer";
		}
		
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
			this.addPlayableDiv(playables[pl].imageUrl,playables[pl].title, playables[pl].provider);
		}
		return playables;
	}
	
	updateState(oldState,newState){
		var el = $(".player_play").first()
		console.log("UpdateState")
		
		if(newState=='playing') 
		{
			el.src='../pics/pause.svg'
			el.removeClass('player_button_play').addClass('player_button_pause');
			console.log("playing now")
		}
		else if(newState=='paused' || newState=='stopped')
		{
			el.src='../pics/play.svg'
			el.removeClass('player_button_pause').addClass('player_button_play');
			console.log("pausing/stopping now")
		}
		else if(newState=='loading')
		{
			
		}
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
		this.getPlayables();
		
		// states:
		// loading, stopped, playing, paused
		this.updateState('loading');
		DZ.init({
			appId  : this.apikey,
			channelUrl : 'http://localhost/mypi/frontend/channel.html',
			player : {
				onload : this.onPlayerLoaded.bind(this)
			}
		});
	}
	
	onPlayerLoaded() {
		console.log("Player loaded")
		this.updateState('stopped');
		// DZ.player.playAlbum(302127);
		DZ.player.pause();
	}
	
	updateState(state) {
		this.controller.updateState(this.state,state);
		this.state=state;
	}
	
	play() {
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
					this.updateState('playing');
					console.log(this.id + ' plays.');
					responsiveVoice.speak(nextPlayable.data,"Deutsch Female",parameters);
					this.currentPlayable=nextPlayable;
				}
			}
		}
	}
	  
	pause() {
		if (this.currentPlayable instanceof News)
		{
			this.updateState('paused');
			responsiveVoice.pause();
		}
	}	
	  
	resume() {
		if (this.currentPlayable instanceof News)
		{
			this.updateState('playing');
			responsiveVoice.resume();
		}
	}
	  
	stop() {
		if (this.currentPlayable instanceof News)
		{
			this.updateState('stopped');
			responsiveVoice.cancel();
			
		}
		this.currentPlayable=null;
	}
	
	skip() {
		var nextPlayable=this.playables.shift();
		this.controller.move_down();
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

