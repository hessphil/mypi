'use strict';

const Playable = require('./data/playable.js');
const Text = require('./data/text.js');
const Song = require('./data/song.js');
const News = require('./data/news.js');
<<<<<<< HEAD
const FaceBookDataCrawler = require('./data/facebookdatacrawler.js');
const InterestProfile = require('./data/interestprofile.js');


=======
const NewsDataCrawler = require('./datacrawler/NewsDataCrawler.js');
>>>>>>> b032ea7be989a46be934e2620e846844b70d7d09

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
		playables=this.newsDataCrawler.getPlayables();
		console.log(playables);
	}
			
		
}

<<<<<<< HEAD
=======
class FaceBookDataCrawler {
	constructor()
	{
	}
	//Variables
	
	//last timestamp for message
	
	//Methods
	//Connect to FaceBook Profile
	Connect(token)
	{
		this.token = token;
		//test connection?
	}
	
	//Create Interest Profile
	fillInterestProfile(interestProfile)
	{
		//get keywords
		
		//get interprets
		
		//get news provider
	}
	
	//Check for Messages
	checkForNewMessages()
	{
		//get all messages
		//check new ones via timestamp
		//check if not older than 10 minutes
		//check if sent or received
		//return message
	}
	//Get Playabels
	getPlayables()
	{
		//check for new messages
		//convert to playables
		//return playables
		return this.token;
	}
}
>>>>>>> b032ea7be989a46be934e2620e846844b70d7d09



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