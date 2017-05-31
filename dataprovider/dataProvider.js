'use strict';

const Playable = require('./data/playable.js');
const Text = require('./data/text.js');
const Sound = require('./data/sound.js');
const News = require('./data/news.js');


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
			
		
}

class FaceBookDataCrawler {
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

class NewsDataCrawler{
	//Variables
	//Map with all Providers
	
	//Methods
	
	//SetRelevantProvider
	
	//GetNews
	//gets all news for keyword
	//return list of playables
	
	
	//GetTheLatest

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

class InterestProfile
{
		constructor(){
		this.keywordArray=[];
		this.interpretsArray=[];
		this.newsProviderArray=[];
		}
		
		addKeyWord(keyword)
		{
			this.keywordArray.push(keyword);
		}
		addInterpret(interpret)
		{
			this.interpretsArray.push(interpret);
		}
			addnewsProvider(newsProvider)
		{
			this.newsProviderArray.push(newsProvider);
		}
}

module.exports = DataProvider;