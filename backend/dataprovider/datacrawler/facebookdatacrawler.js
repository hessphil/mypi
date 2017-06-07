'use strict';
const request = require('request-promise');  


class FaceBookDataCrawler{
	constructor(facebookdatacrawler) {
		this.facebookdatacrawler = facebookdatacrawler;
		this.fbRes = null;
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
	const userFieldSet = 'name,category';
	
	const options = {
    method: 'GET',
    uri: `https://graph.facebook.com/v2.8/me/likes`,
    qs: {
      access_token: this.token,
      fields: userFieldSet
    }
	};
	
	request(options)
    .then(function(fbRes) {

      this.fbRes = JSON.parse(fbRes).data

	  var i;

	 for (i=0;i<this.fbRes.length;i++)
	 {
		 // console.log(this.fbRes[i].name);
		 //console.log(this.fbRes[i].category);
		 // console.log(this.fbRes[i].category_list);
		 
		 		
		 //get interprets
		 if (this.fbRes[i].category==='Musician/Band')
		 {
		 //console.log(this.fbRes[i].name);
		 interestProfile.addInterpret(this.fbRes[i].name);
		 }
		 
	 }

	 return interestProfile;

    }.bind(this));
	

	//get keywords

		
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
