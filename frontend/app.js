class Controller { 
	constructor() {
		this.counter=0;
		this.scrollPos=0;
		this.deezer_logged_in=0;
		this.playlist_id=0;
		this.songList=[];
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
		var x = document.cookie.substring(0,25)
		console.log(x)
		var url = "http://localhost:8080/getNews/" + x.split("=")[1];
		console.log(this.httpGet(url))
		var jsonNewsTest = JSON.parse(this.httpGet(url));
		console.log(jsonNewsTest);
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
	
	
	deezerLogin(callback){
		DZ.login(function(response) {
			if (response.authResponse) {
				DZ.api('/user/me', function(response) {
					console.log('Good to see you, ' + response.name + '.');
				});
				this.deezer_logged_in=1
				
				this.getSongs(callback);
			} else {
				console.log('User cancelled login or did not fully authorize.');
			}
		}.bind(this), {perms: 'basic_access,email'});
	}
	
	
	
	getSongs(callback){
		if (this.deezer_logged_in==1)
		{
			DZ.api('user/me/playlists', 'GET', function(response){
				var leisurePlaylist = null;
					
				console.log(response.data)
				
				
				for (var i=0;i<response.data.length;i++)
				{
					if(response.data[i].title=="Leisure")
					{
						leisurePlaylist=response.data[i];
						break
					}
				}
				
				console.log("My new playlist ID", leisurePlaylist.id);
				
				this.playlist_id=leisurePlaylist.id
				
				
				DZ.api('playlist/' + this.playlist_id, 'GET', function(response){
					
					console.log(response.tracks.data)
					for (var i=0;i<response.tracks.data.length;i++)
					{
						var deezerTrack = response.tracks.data[i]
						console.log(deezerTrack)
						//fill news with data
						var curSong = new Song(deezerTrack.id,deezerTrack.title,deezerTrack.artist.name,deezerTrack.album.name,deezerTrack.album.cover,deezerTrack.link,deezerTrack.duration);
						
						console.log(curSong.title);
						this.addPlayableDiv(curSong.imageUrl,curSong.title,"");
						
						//add song to list
						this.songList.push(curSong);
					}
					
					callback();
				}.bind(this));
			}.bind(this));
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
Playable.prototype.data = "";



var News = function(text) {
    Playable.apply(this, [text]);
};
News.prototype = Object.create(Playable.prototype);
News.prototype.constructor = News;
News.prototype.data="";


var Song = function(id,title,interpret,album,imageUrl,songUrl,duration) {
    Playable.apply(this, [title]);
	this.id=id;
	this.title=title;
	this.interpret=interpret;
	this.album=album;
	this.imageUrl=imageUrl;
	this.songUrl=songUrl;
	this.duration=duration;
};
Song.prototype = Object.create(Playable.prototype);
Song.prototype.constructor = Song;
Song.prototype.data="";
Song.prototype.id="";
Song.prototype.title="";
Song.prototype.interpret="";
Song.prototype.album="";
Song.prototype.imageUrl="";
Song.prototype.songUrl="";
Song.prototype.duration="";

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
		DZ.player.pause();
	}
	
	updateState(state) {
		this.controller.updateState(this.state,state);
		this.state=state;
	}
	
	play() {
		if(this.controller.deezer_logged_in==0)
		{
			this.controller.deezerLogin(function(){
				console.log("deezerLogin callback")
				console.log(this.controller.songList)
				var playables=this.controller.songList;
				for (var i=0;i<playables.length;i++)
				{
					console.log("Add " + playables[i].title)
					this.addPlayable(playables[i])					
				}
			}.bind(this));
		}

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
				else if(nextPlayable instanceof Song)
				{
					console.log("Play deezer song " + nextPlayable.id);
					DZ.player.playTracks([nextPlayable.id]);
					DZ.player.play();
					this.updateState('playing');
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
		else if(nextPlayable instanceof Song)
		{
			DZ.player.pause();
			
		}
	}	
	  
	resume() {
		if (this.currentPlayable instanceof News)
		{
			this.updateState('playing');
			responsiveVoice.resume();
		}
		else if(nextPlayable instanceof Song)
		{
			DZ.player.pause();
			
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
		else if(nextPlayable instanceof Song)
		{
			DZ.player.playTracks([nextPlayable.id]);
			DZ.player.play();
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

