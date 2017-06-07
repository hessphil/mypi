'use strict';

const Playable = require('./data/playable.js');
const Text = require('./data/text.js');
const Song = require('./data/song.js');
const News = require('./data/news.js');
const FaceBookDataCrawler = require('./datacrawler/facebookdatacrawler.js');
const InterestProfile = require('./data/interestprofile.js');
const NewsDataCrawler = require('./datacrawler/NewsDataCrawler.js');



//dataProvider class for each client one instance
class DataProvider {
	//Methods
		//constructor gets token for facebook account
		constructor(fbToken){
		//Connect to facebook
		//ring buffer for playables
		this.playabelArray = [];

		//playables counter
		this.playableCounter = 0;
		//datacrawler for news API
		this.newsDataCrawler = new NewsDataCrawler();
		//datacrawler for music streaming service
		this.musicDataCrawler= new MusicDataCrawler();
		//datacrawler for facebook
		this.fbDataCrawler = new FaceBookDataCrawler();
		// InterestProfile
		this.interestProfile = new InterestProfile();
		
		this.fbDataCrawler.Connect(fbToken);
		this.fbDataCrawler.fillInterestProfile(this.interestProfile);
		
		}
		

	//transmit next playables
	transmitPlayables()
	{
		//transmit last playables in buffer
		
			//remove playables from buffer
	}

	//Run method cyclically collects playables
	run(){
		//collect all news for all keywords
		//add latest news for each keyword
		
		//get new song from music stream 
			//either search for interpret or playlist or genre?

		//check for facebook messages
		
		//add playables to buffer and increment counter
		playable = new Playable();
		playable.setDescription(description);
		this.playabelArray.push(playable);
		playableCounter=playableCounter+1;
		//sort playables by interests and settings of user here or on client side
		
		//check if counter has reached limit
		if (playableCounter==10)
		{
			//transmit playables to client
			transmitPlayables();
		}
			
	}
	get(){
		this.newsDataCrawler.addKeyWord("Trump");
		this.newsDataCrawler.setRelevantProvider("spiegel");
		var playables=this.newsDataCrawler.getPlayables();
		console.log(playables);
	}
			
		
}

class MusicDataCrawler 
{
	//Variables
	//InterpretsOfInterest
	//Genres
	
	//Methods
	//Set Interprets
	//Set Genres
	
	//GetNextSong
	GetSongOfPlaylist(){
		newPlayable = new Playable();
		//return Playable
	}
		
		
	//GetSongOfInterpret
	GetSongOfInterpret(){
		
		//return
	}
	
	//GetSongOfPlaylist
	GetSongOfPlaylist(){
		
		//return
	}
	//GetSongOfGenre
	GetSongOfGenre(){
		
		//return
	}
	
}


module.exports = DataProvider;