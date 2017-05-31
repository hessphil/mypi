'use strict';
const request = require('request-promise');  

class FaceBookDataCrawler{
	constructor(facebookdatacrawler) {
		this.facebookdatacrawler = facebookdatacrawler
		//this.token = ''
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
	// you need permission for most of these fields
	const userFieldSet = 'name';
	

	const options = {
    method: 'GET',
    uri: `https://graph.facebook.com/v2.8/me/likes?fields=id,name,category,category_list`,
    qs: {
      access_token: this.token,
      fields: userFieldSet
    }
	};
	
	request(options)
    .then(fbRes => {
      Console.Log(json(fbRes));
    })
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

module.exports = FaceBookDataCrawler;
