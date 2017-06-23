class Controller { 
	constructor() {
		this.counter=0;
		this.scrollPos=0;
		this.deezer_logged_in=0;
		this.playlist_id=0;
		this.playableList=[];
		
		this.playableIndex=1;
		
		this.playableList.push(new News("Schön dich wiederzusehen Max!"))
		this.addPlayableDiv("../pics/mypi_logo_square2.png","Schön dich wiederzusehen Max!", "","null");

        document.getElementById('playCon').scrollTop = 0
	}
	
	httpGet(theUrl) {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
		xmlHttp.send( null );
		return xmlHttp.responseText;
	}
	move_down() {
		document.getElementById('playCon').scrollTop=this.scrollPos+100;
		this.scrollPos=document.getElementById('playCon').scrollTop;
	}

	move_up() {

		document.getElementById('playCon').scrollTop =this.scrollPos;

    }
	


	changeDiv()
	{
		if (document.getElementById('minimize'))
		{
			document.getElementById('playCon').style.height="0px";
			document.getElementById('minimize').src="../pics/down.png";
			document.getElementById('minimize').setAttribute("id","extend");
		}
		else
		{
			document.getElementById('playCon').style.height="400px";
			document.getElementById('extend').src="../pics/up.png";
			document.getElementById('extend').setAttribute("id","minimize");
		}
	}
	
	getNews() {
		// Read the API token from Cookie
		// Query data until we get a valid response
		var x = document.cookie.substring(0,25)
		var url = "http://localhost:8080/getNews/" + x.split("=")[1];
		var jsonNewsTest = JSON.parse(this.httpGet(url));
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
		
	addPlayableDiv(img_url,content,NewsProvider,source) {
		var div = document.createElement('div');
		var img = document.createElement('img');
		var div_detail = document.createElement('div');
		var img_src = document.createElement('img');
		var strong = document.createElement('strong');
		var a = document.createElement('a');
		
		if(source!="null"){
			a.href=source;
			a.target="_blank";
		}

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
		
		if(source!="null"){
			a.appendChild(div);
		}
		
		var parent = document.getElementById('playCon');
		
		if(source!="null"){
			this.insertAfter(a, parent.lastChild);
			
		}
		else{
			this.insertAfter(div, parent.lastChild);
		}
		
		this.counter++;
	}
	
	removePlayableDiv(){
		
		var parent = document.getElementById('playCon');
		parent.removeChild(parent.childNodes[0]);
		this.counter--;
	}
	
	addToPlayList(playable){
		//check priority and calculate position in queue (even at highest prio)
		//get the next five items
		// var previousList=[]
		// for (var pl=0;pl<5 && (this.playableIndex-pl) > 1;pl++)
		// {
			// previousList.push(this.playableList[pl])
		// }
		
		// console.log(previousList)
		
		// var forcastList=[]
		// for (var pl=0;pl<5 && (pl + this.playableIndex) < this.playableList.length;pl++)
		// {
			// forcastList.push(this.playableList[pl])
		// }
		
		
		// --> WTF simply do a shuffle of all upcoming now
		if(playable instanceof Song || playable instanceof News)
		{			
			this.playableList.push(playable)
			this.playableList=this.shuffle(this.playableList,this.playableIndex)
		} 
		else if(playable instanceof EMail)
		{
			this.playableList.splice((Number(this.playableIndex)+2), 0, playable);
		}
		
		// var forcastList=[]
		// for (var pl=this.playableIndex+1; (pl + this.playableIndex) < this.playableList.length;pl++)
		// {
			// forcastList.push(this.playableList[pl])
		// }
		
		// console.log(previousList)
		// console.log(forcastList)
		
		
		
		// if (this.currentPlayable instanceof News)
		// {
			// this.playableList.arr.splice(this.playableIndex+1, 0, playable);
		// }
		// else if(this.currentPlayable instanceof Song)
		// {
			// this.playableList.arr.splice(this.playableIndex+2, 0, playable);
		// }
		
		
		
		//if position is one ahead of current replace preview div 
		
	}
	
	
	shuffle(a,limitIndex) {
		var j, x, i;
		j=0;
		for (i = a.length; i>limitIndex; i--) {
			while(j<limitIndex)
			{
				j = Math.floor(Math.random() * i);
			}
			x = a[i - 1];
			a[i - 1] = a[j];
			a[j] = x;
		}
		return a
	}
	
	queryNewsAndInsert(){
		var playables;
		playables=this.getNews();
		for (var pl=0;pl<playables.length;pl++)
		{
			console.log(playables[pl].imageUrl);
			this.addToPlayList(new News(playables[pl].title + "." + playables[pl].text,playables[pl].title,playables[pl].imageUrl,playables[pl].provider,playables[pl].source))
		}
		return playables;
	}
	
	queryMailsAndInsert(){
		
		//var EMail = function(id,sender,subject,content,provider)
		this.addToPlayList(new EMail(1,"Marc Zuckerberg","Ihr rockt!","Ich kaufe euch fuer eine Milliarde",""))
	}
	
	updateState(oldState,newState){
		var el = $(".player_play").first()
		if(newState=='playing') 
		{
			el.src='../pics/pause.svg'
			el.removeClass('player_button_play').addClass('player_button_pause');
		}
		else if(newState=='paused' || newState=='stopped')
		{
			el.src='../pics/play.svg'
			el.removeClass('player_button_pause').addClass('player_button_play');
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
				this.deezer_logged_in=0
			}
		}.bind(this), {perms: 'basic_access,email'});
	}
	
	
	
	getSongs(callback){
		if (this.deezer_logged_in==1)
		{
			DZ.api('user/me/playlists', 'GET', function(response){
				var leisurePlaylist = null;
				for (var i=0;i<response.data.length;i++)
				{
					if(response.data[i].title=="Leisure")
					{
						leisurePlaylist=response.data[i];
						break
					}
				}
				
				this.playlist_id=leisurePlaylist.id
				
				DZ.api('playlist/' + this.playlist_id, 'GET', function(response){
					
					for (var i=0;i<response.tracks.data.length;i++)
					{
						var deezerTrack = response.tracks.data[i]
						//fill news with data
						var curSong = new Song(deezerTrack.id,deezerTrack.title,deezerTrack.artist.name,deezerTrack.album.name,deezerTrack.album.cover,deezerTrack.link,deezerTrack.duration);
						
						//add song to list
						this.addToPlayList(curSong);
					}
					
					callback();
				}.bind(this));
			}.bind(this));
		}
	}
	
	
	addPreviewDiv(index)
	{
		var previewPlayable=this.playableList[index]
		if(previewPlayable instanceof News)
		{
            this.addPlayableDiv(previewPlayable.imageUrl, previewPlayable.title, previewPlayable.provider,previewPlayable.source);
		}
		else if(previewPlayable instanceof Song)
		{
            this.addPlayableDiv(previewPlayable.imageUrl, previewPlayable.interpret + " - " + previewPlayable.title, "deezer", "null");
		}
		else if(previewPlayable instanceof EMail)
		{
            this.addPlayableDiv('../pics/mail.png', previewPlayable.sender + " - " + previewPlayable.subject, "", "null");
		}
	}
	
	removePreviewDiv()
	{
		var parent = document.getElementById('playCon');
		parent.removeChild(parent.lastChild);
		this.counter--;
	}
	
	getCurrentPlayable(intern=false)
	{
		if(this.playableIndex==1 && !intern)
		{
			this.addPreviewDiv(this.playableIndex);
			this.addPreviewDiv(this.playableIndex+1);
			
		}

		
		return this.playableList[this.playableIndex];
	}
	
	//ensure that getCurrentPlayable() was called once before!
	getNextPlayable()
	{
		if(this.playableList.length > this.playableIndex+1)
		{
			
			//already added by getCurrentPlayable(true) but we still need to move down once for it..
			
			if(this.playableIndex!=1)
			{
				this.move_down();
				this.move_down();
			}
			
			this.playableIndex=this.playableIndex+1;
			this.addPreviewDiv(this.playableIndex+1);

	
			if(this.playableIndex!=this.playableList.length)
			{
				console.log("Move down")
				this.move_down();
			}
		
			return this.getCurrentPlayable(true);
		}
		//disable_next_button();
		return null;
	}
	
	
	getPreviousPlayable()
	{
		if(this.playableIndex-1 >= 1)
		{
			var prevIndex=this.playableIndex;
			this.playableIndex=this.playableIndex-1;
			this.removePreviewDiv();
			if(prevIndex!=1)
			{				
				this.move_up();
			}
			return this.getCurrentPlayable(true);
		}
		
		//disable_prev_button();
		return null;
	}
}


/**
 @constructor
 @abstract
 */
var Playable = function(text) {
    if (this.constructor === Playable) {
      throw new Error("Can't instantiate abstract class!");
    }
	this.data=text;
	this.view=null;
};
Playable.prototype.data = "";



var News = function(text,title,imageUrl,provider,source) {
    Playable.apply(this, [text]);
	this.text=text;
	this.imageUrl=imageUrl;
	this.title=title;
	this.provider=provider;
	this.source=source;
};
News.prototype = Object.create(Playable.prototype);
News.prototype.constructor = News;
News.prototype.text="";
News.prototype.imageUrl="";
News.prototype.title="";
News.prototype.source="";

var Song = function(id,title,interpret,album,imageUrl,songUrl,duration,provider) {
    Playable.apply(this, [title]);
	this.id=id;
	this.title=title;
	this.interpret=interpret;
	this.album=album;
	this.imageUrl=imageUrl;
	this.songUrl=songUrl;
	this.duration=duration;
	this.provider=provider;
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
Song.prototype.provider="";


var EMail = function(id,sender,subject,content,provider) {
    Playable.apply(this, [subject]);
	this.id=id;
	this.sender=sender;
	this.subject=subject;
	this.content=content;
	this.provider=provider;
};
EMail.prototype = Object.create(Playable.prototype);
EMail.prototype.constructor = EMail;
EMail.prototype.data="";
EMail.prototype.id="";
EMail.prototype.sender="";
EMail.prototype.subject="";
EMail.prototype.content="";
EMail.prototype.provider="";

class Mediaplayer{ 
	constructor(id,apikey,controller) {
		this.id=id;
		this.apikey=apikey;
		this.playables=[];
		this.soundVolume=10;
		this.positionPoll=null;
		this.currentPlayable=null;
		this.controller=controller;
				
		$("#prevMediaplayer").prop("disabled", true);
		$("#nextMediaplayer").prop("disabled", true);
		

		// states:
		// loading, stopped, playing, paused
		$("#playMediaplayer").prop("disabled", true);
		
		this.updateState('loading');
		DZ.init({
			appId  : this.apikey,
			channelUrl : 'http://localhost/mypi/frontend/channel.html',
			player : {
				onload : this.onPlayerLoaded.bind(this)
			}
		});
		
		DZ.Event.subscribe('track_end', function(track_end){
			this.skip();
		}.bind(this));
		
	}
	
	onPlayerLoaded() {
		console.log("Player loaded");
		$("#playMediaplayer").prop("disabled", false);
		this.updateState('stopped');
	}
	
	updateState(state) {
		this.controller.updateState(this.state,state);
		this.state=state;
	}
	
	play() {
		if(this.controller.deezer_logged_in==0)
		{
			this.controller.queryNewsAndInsert();
			
			this.controller.deezerLogin(function(){
				$("#prevMediaplayer").prop("disabled", false);
				$("#nextMediaplayer").prop("disabled", false);
				
				this.controller.queryMailsAndInsert();
				this.play();
			}.bind(this));
			return
		} 
		
		if(this.currentPlayable==null)
		{
			this.currentPlayable=this.controller.getCurrentPlayable();
		} else {
			this.stop(true);
		}
		
		if (this.currentPlayable instanceof News || this.currentPlayable instanceof EMail)
		{
			var parameters = {
				onend: this.skip.bind(this)
			}
			this.updateState('playing');
			
			var textToPlay=''
			if (this.currentPlayable instanceof News)
			{
				textToPlay=this.currentPlayable.text
			}
			else if (this.currentPlayable instanceof EMail)
			{
				textToPlay="E-Mail von " + this.currentPlayable.sender + ". Betreff: " + this.currentPlayable.subject
			} 

			responsiveVoice.speak(textToPlay,"Deutsch Female",parameters);
			
		}
		else if(this.currentPlayable instanceof Song)
		{
			DZ.player.playTracks([this.currentPlayable.id]);
			DZ.player.play();
			this.updateState('playing');
		}
	}
	  
	pause() {
		if(this.currentPlayable instanceof Playable)
		{
			this.updateState('paused');
			if (this.currentPlayable instanceof News || this.currentPlayable instanceof EMail)
			{
				responsiveVoice.pause();
			}
			else if(this.currentPlayable instanceof Song)
			{
				DZ.player.pause();
			}
		}
	}	
	  
	resume() {
		if(this.currentPlayable instanceof Playable)
		{
			this.updateState('playing');
			
			if (this.currentPlayable instanceof News || this.currentPlayable instanceof EMail)
			{
				responsiveVoice.resume();
			}
			else if(this.currentPlayable instanceof Song)
			{
				DZ.player.play();
			}
		}
	}
	  
	stop(isInternal=false) {
		if(this.currentPlayable instanceof Playable)
		{
			if(!isInternal)
			{
				this.updateState('stopped');				
			}
			
			if(this.currentPlayable instanceof News || this.currentPlayable instanceof EMail)
			{
				responsiveVoice.cancel();
			}
			else if(this.currentPlayable instanceof Song)
			{
				DZ.player.pause();
			}
		}
	}
	
	skip() {
		
		// var nextPlayable=this.playables.shift();
		var nextPlayable=this.controller.getNextPlayable();
		
		if(nextPlayable!=null)
		{
			this.stop(true);
			this.currentPlayable=nextPlayable;
			this.play();
		}
	}
	
	prev()
	{
		// var nextPlayable=this.playables.shift();
		var prevPlayable=this.controller.getPreviousPlayable();
		if(prevPlayable!=null)
		{
			this.stop(true);
			this.currentPlayable=prevPlayable;
			this.play();
		}
	}
}

