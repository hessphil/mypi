'use strict';
const request = require('request-promise');  
const Song = require('../data/song.js');

class DeezerDataCrawler{
	constructor(deezerdatacrawler) {
		this.deezerdatacrawler = deezerdatacrawler;
		this.deezerRes = null;
	}
	
	//Variables
	this.songList=[];
	this.songPlayableArrayHistory = [];
	//last timestamp for message
	
	//Methods
	//Connect to Deezer Account
	Connect(token)
	{
		this.token = token;
		//test connection?
	}
	
	GetSongs()
	{
		var numbersToRemove=this.songList.length;
		if (numbersToRemove>5)
		{
			numbersToRemove=5;
		}
		var subSongsArray=this.songList.splice(0,numbersToRemove);
		//console.log('transmitNewsPlayables:subNewsArray:'+subNewsArray);
		return subSongsArray;
		//remove playables from buffer
		//this.newsPlayableArray=this.newsPlayableArray.splice(0, 5);
	}

	//Create Interest Profile
	ReadPlayList()
	{
		
		// you need permission for most of these fields
		//const userFieldSet = 'name,category';
		
		const options = {
		method: 'GET',
		//uri: `http://api.deezer.com/user/me/playlists`,
		uri: `http://api.deezer.com/playlist/3237506022/`,
		qs: {
		  access_token: this.token,
		  //fields: userFieldSet
		}
		};
		
		request(options)
		.then(function(deezerRes) {

		  this.deezerTracks	  = JSON.parse(deezerRes).tracks.data

		  var i;
		  
		  this.resp = d;
						
		  

		 for (i=0;i<this.deezerTracks.length;i++)
		 {
			 
			var curSong = new Song();
					
			//fill news with data
			curSong.title = deezerTracks[i].title
			curSong.genre = ""
			curSong.interpret = deezerTracks[i].artist.name
			curSong.source = source
			curSong.imageUrl = deezerTracks[i].album.cover
			curSong.songUrl = deezerTracks[i].link
			curSong.duration = deezerTracks[i].duration
			
			//add song to list
			this.songList.push(curSong);
			
			 
		 }
		// callbackfunction(this.songList);

		}.bind(this));
	


	}
	
}

module.exports = FaceBookDataCrawler;
