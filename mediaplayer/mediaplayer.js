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





CreateSoundcloudApiUrl = function(url, apiKey) {
	var useSandBox=false;
	var domain = useSandBox ? 'sandbox-soundcloud.com' : 'soundcloud.com';
    var secureDocument = (document.location.protocol === 'https:');
	var resolver = ( secureDocument || (/^https/i).test(url) ? 'https' : 'http') + '://api.' + domain + '/resolve?url=',
		params = 'format=json&consumer_key=' + apiKey +'&callback=?';

	// force the secure url in the secure environment
	if( secureDocument ) {
	  url = url.replace(/^http:/, 'https:');
	}

	// check if it's already a resolved api url
	if ( (/api\./).test(url) ) {
	  return url + '?' + params;
	} else {
	  return resolver + url + '&' + params;
	}
};

function GetSoundcloudData(uri,apikey){
  var apiUrl = CreateSoundcloudApiUrl(uri,apikey);
  return $.getJSON(apiUrl).then(function(data){
    return data;
  });
}


var SoundCloudTrack = function(url) {
    Playable.apply(this, [url]);
};
SoundCloudTrack.prototype = Object.create(Playable.prototype);
SoundCloudTrack.prototype.constructor = SoundCloudTrack;
SoundCloudTrack.prototype.data="";

SoundCloudTrack.prototype.data="";
SoundCloudTrack.prototype.play = function() {
	return null;
}
SoundCloudTrack.prototype.stop = function() {
	return null;
}
SoundCloudTrack.prototype.pause = function() {
	return null;
}
SoundCloudTrack.prototype.resume = function() {
	return null;
}
SoundCloudTrack.prototype.getView = function() {
	return null;
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


var SoundCloudHtml5AudioDriver = function(callbacks) {
	this.player = new Audio(),
	onTimeUpdate = function(event){
		var obj = event.target,
		buffer = ((obj.buffered.length && obj.buffered.end(0)) / obj.duration) * 100;
		// ipad has no progress events implemented yet
		callbacks.onBuffer(buffer);
		// anounce if it's finished for the clients without 'ended' events implementation
		if (obj.currentTime === obj.duration) { callbacks.onEnd(); }
	},
	onProgress = function(event) {
		var obj = event.target,
		buffer = ((obj.buffered.length && obj.buffered.end(0)) / obj.duration) * 100;
		callbacks.onBuffer(buffer);
	};

	$('<div class="sc-player-engine-container"></div>').appendTo(document.body).append(this.player);
	
	
	// prepare the listeners
	this.player.addEventListener('play', callbacks.onPlay);
	this.player.addEventListener('pause', callbacks.onPause);
	// handled in the onTimeUpdate for now untill all the browsers support 'ended' event
	this.player.addEventListener('ended', callbacks.onEnd);
	this.player.addEventListener('timeupdate', onTimeUpdate);
	this.player.addEventListener('progress', onProgress);
}



SoundCloudHtml5AudioDriver.prototype.load = function(track,apikey,container=null) {
	GetSoundcloudData(track.uri,apikey).then(function(data)
	{
		this.player.pause();
		this.player.src = data.stream_url + (/\?/.test(data.stream_url) ? '&' : '?') + 'consumer_key=' + apikey;
		this.player.load();
		this.player.play();
	}.bind(this));
}

SoundCloudHtml5AudioDriver.prototype.play = function() {
	this.player.play();
}

SoundCloudHtml5AudioDriver.prototype.pause = function() {
	this.player.pause();
}

SoundCloudHtml5AudioDriver.prototype.stop = function() {
	if (this.player.currentTime) {
		this.player.currentTime = 0;
		this.player.pause();
	}
}

SoundCloudHtml5AudioDriver.prototype.seek = function(relative) {
	this.player.currentTime = this.player.duration * relative;
	this.player.play();
}

SoundCloudHtml5AudioDriver.prototype.getDuration = function() {
	return this.player.duration * 1000;
}

SoundCloudHtml5AudioDriver.prototype.getPosition = function() {
	return this.player.currentTime * 1000;
}

SoundCloudHtml5AudioDriver.prototype.setVolume = function(val) {
	this.player.volume = val / 100;
}


var SoundCloudFlashAudioDriver = function(callbacks) {
	var engineId = 'scPlayerEngine';
	this.flashHtml = function(url) {
		var swf = (secureDocument ? 'https' : 'http') + '://player.' + domain +'/player.swf?url=' + url +'&amp;enable_api=true&amp;player_type=engine&amp;object_id=' + engineId;
		if ($.browser.msie) {
		  return '<object height="100%" width="100%" id="' + engineId + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" data="' + swf + '">'+
			'<param name="movie" value="' + swf + '" />'+
			'<param name="allowscriptaccess" value="always" />'+
			'</object>';
		} else {
		  return '<object height="100%" width="100%" id="' + engineId + '">'+
			'<embed allowscriptaccess="always" height="100%" width="100%" src="' + swf + '" type="application/x-shockwave-flash" name="' + engineId + '" />'+
			'</object>';
		}
	}
	// listen to audio engine events
	// when the loaded track is ready to play
	soundcloud.addEventListener('onPlayerReady', function(flashId, data) {
		this.player = soundcloud.getPlayer(engineId);
		callbacks.onReady();
	});

	// when the loaded track finished playing
	soundcloud.addEventListener('onMediaEnd', callbacks.onEnd);

	// when the loaded track is still buffering
	soundcloud.addEventListener('onMediaBuffering', function(flashId, data) {
		callbacks.onBuffer(data.percent);
	});

	// when the loaded track started to play
	soundcloud.addEventListener('onMediaPlay', callbacks.onPlay);

	// when the loaded track is was paused
	soundcloud.addEventListener('onMediaPause', callbacks.onPause);
}

SoundCloudFlashAudioDriver.prototype.load = function(track,apikey=null,container=null) {
	GetSoundcloudData(track.uri,apikey).then(function(data)
	{
		if(this.player){
			this.player.api_load(data.stream_url);
		}
		else
		{
			// create a container for the flash engine (IE needs this to operate properly)
			$('<div class="sc-player-engine-container"></div>').appendTo(container).html(this.flashHtml(data.stream_url));
		}
	}.bind(this,container));
}

SoundCloudFlashAudioDriver.prototype.play = function() {
	this.player && this.player.api_play();
}

SoundCloudFlashAudioDriver.prototype.pause = function() {
	this.player && this.player.api_pause();
}

SoundCloudFlashAudioDriver.prototype.stop = function() {
	this.player && this.player.api_stop();
}

SoundCloudFlashAudioDriver.prototype.seek = function(relative) {
	this.player && this.player.api_seekTo((this.player.api_getTrackDuration() * relative));
}

SoundCloudFlashAudioDriver.prototype.getDuration = function() {
	return this.player && this.player.api_getTrackDuration && this.player.api_getTrackDuration() * 1000;
}

SoundCloudFlashAudioDriver.prototype.getPosition = function() {
	return  this.player && this.player.api_getTrackPosition && player.api_getTrackPosition() * 1000;
}


SoundCloudFlashAudioDriver.prototype.setVolume = function(val) {
	if(this.player && this.player.api_setVolume)
	{
		this.player.api_setVolume(val);
	}
}


class Mediaplayer{ 
	constructor(id,apikey) {
		this.id=id;
		this.apikey=apikey;
		this.playables=[];
		this.soundVolume=10;
		this.positionPoll=null;
		this.currentPlayable=null;
		
		
		var html5AudioAvailable = function() {
			var state = false;
			try{
			  var a = new Audio();
			  state = a.canPlayType && (/maybe|probably/).test(a.canPlayType('audio/mpeg'));
			  // uncomment the following line, if you want to enable the html5 audio only on mobile devices
			  // state = state && (/iPad|iphone|mobile|pre\//i).test(navigator.userAgent);
			}catch(e){
			  // there's no audio support here sadly
			}
			return state;
		}();
		
		console.log(html5AudioAvailable);
		this.soundCloudAudioDriver=null;
		
		this.callbacks = {
			onReady: function() {
				$(document).trigger('scPlayer:onAudioReady');
			},
			onPlay: function() {
				$(document).trigger('scPlayer:onMediaPlay');
			},
			onPause: function() {
				$(document).trigger('scPlayer:onMediaPause');
			},
			onEnd: function() {
				$(document).trigger('scPlayer:onMediaEnd');
			},
			onBuffer: function(percent) {
				$(document).trigger({type: 'scPlayer:onMediaBuffering', percent: percent});
			}
		};
		
		if(html5AudioAvailable)
		{
			this.soundCloudAudioDriver = new SoundCloudHtml5AudioDriver(this.callbacks);
		}
		else 
		{
			this.soundCloudAudioDriver = new SoundCloudFlashAudioDriver(this.callbacks);
		}
	}

	play() {
		console.log(this.id + ' plays.');
		if(this.currentPlayable==null)
		{
			if(this.playables.length > 0)
			{
				// save it first temporarily becuase maybe we have to 
				var nextPlayable=this.playables.shift();
				
				if(nextPlayable instanceof SoundCloudTrack)
				{
					var track = {
						uri: nextPlayable.data
					}
					this.soundCloudAudioDriver.load(track,this.apikey,null);
					this.currentPlayable=nextPlayable;
				}
			}
		}
		else 
		{
			this.soundCloudAudioDriver.play();
		}
	  }
	  
	pause() {
		this.soundCloudAudioDriver.pause();
	  }
	
	skip() {
		var nextPlayable=this.playables.shift();
		
		this.soundCloudAudioDriver.pause();
		
		if(nextPlayable instanceof SoundCloudTrack)
		{
			var track = {
				uri: nextPlayable.data
			}
			this.soundCloudAudioDriver.load(track,this.apikey,null);
			this.currentPlayable=nextPlayable;
		} 
		else if (nextPlayable instanceof News)
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

