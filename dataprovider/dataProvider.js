
//dataProvider class for each client one instance
class DataProvider {
	//Variables
	//datacrawler for news API
	newsDataCrawler= new NewsDataCrawler{};
	
	//datacrawler for music streaming service
	musicDataCrawler= new MusicDataCrawler{};
	
	//datacrawler for facebook
	fbDataCrawer = new FaceBookDataCrawler{};
	
	// InterestProfile
	interestProfile = new InterestProfile{};
	
	//ring buffer for playables
	playabelArray = [];

	//playables counter
	playableCounter = 0;
	//Methods
		//constructor gets token for facebook account
		constructor(fbToken){
		//Connect to facebook
		this.fBDataCrawler.Connect(fbToken);
		this.fbDataCrawer.fillInterestProfile(this.interestProfile);
		
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
		playable = new Playable{};
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
	getPlayables{
		//check for new messages
		//convert to playables
		//return playables
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
		newPlayable = new Playable{}
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

class Playable {
	setDescription (description)
	{
		this.description=description;
	}
}
