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
		this.newsPlayableArray = [];
		
		
		//playables counter
		this.newsPlayableCounter = 0;
		//datacrawler for news API
		this.newsDataCrawler = new NewsDataCrawler();
			//this.newsDataCrawler.addKeyWord("Trump");
			//this.newsDataCrawler.addKeyWord("Blutzucker");
		this.newsDataCrawler.setRelevantProviders("spiegel");
		this.newsDataCrawler.setRelevantProviders("bild");
		this.newsDataCrawler.setRelevantProviders("zeit");
		//datacrawler for music streaming service
		this.musicDataCrawler= new MusicDataCrawler();
		//datacrawler for facebook
		this.fbDataCrawler = new FaceBookDataCrawler();
		
		this.interestProfile = new InterestProfile();
		
		this.fbDataCrawler.Connect(fbToken);
		this.fbDataCrawler.fillInterestProfile(this.interestProfile,function (value){
			this.interestProfile=value;
			this.newsDataCrawler.addKeyWords(this.interestProfile.keywordArray);
			}.bind(this));
		}
		

	//transmit next playables
	transmitNewsPlayables()
	{
		//console.log('transmitNewsPlayables: newsPlayableArray.length:'+this.newsPlayableArray.length);
		//transmit first 5 playables in buffer
		var numbersToRemove=this.newsPlayableArray.length;
		if (numbersToRemove>5)
		{
			numbersToRemove=5;
		}
		var subNewsArray=this.newsPlayableArray.splice(0, 1);
		//console.log('transmitNewsPlayables:subNewsArray:'+subNewsArray);
		return subNewsArray;
		//remove playables from buffer
		//this.newsPlayableArray=this.newsPlayableArray.splice(0, 5);
		
	}

	//Run method cyclically collects playables
	run(){
		//collect all news for all keywords
		//add latest news for each keyword
		//console.log('dataprovider::run');
		this.newsDataCrawler.getPlayables(function (curNewsPlayables){
					if (typeof curNewsPlayables !== 'undefined')
				{
					//console.log('dataprovider::newsCallBackFunction added new news to array:'+curNewsPlayables.length);
					//add to list of playables
					this.newsPlayableArray=this.newsPlayableArray.concat(curNewsPlayables);
					//console.log('dataprovider::newsCallBackFunction: newsPlayableArray.length:'+this.newsPlayableArray.length);
		
				}
				}.bind(this));
		
		//get new song from music stream 
			//either search for interpret or playlist or genre?

		//check for facebook messages
		
		//add playables to buffer and increment counter
		// playable = new Playable();
		// playable.setDescription(description);
		// this.playabelArray.push(playable);
		// playableCounter=playableCounter+1;
		//sort playables by interests and settings of user here or on client side
		
		//check if counter has reached limit
		// if (playableCounter==10)
		// {
			// //transmit playables to client
			// transmitPlayables();
		// }
			
	}
	get(){
	
		var playables=this.newsDataCrawler.getPlayables();
		console.log(playables);
		return playables;
	}
	
	newsCallBackFunction(curNewsPlayables)
	{
		if (typeof curNewsPlayables !== 'undefined')
		{
			console.log('dataprovider::newsCallBackFunction added new news to array:'+curNewsPlayables.length);
			//add to list of playables
			this.newsPlayableArray.concat(curNewsPlayables);
		}
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