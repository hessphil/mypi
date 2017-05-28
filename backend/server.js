var express = require('express');
var app = express();
var fs = require("fs");
var apitoken = require('rand-token');

var bodyParser = require('body-parser');
app.use( bodyParser.json() );


// Besser eine DataProviderManagement?!
var dpMap = {};
var token = [];

/*****************/
class DataProvider {
    constructor(fbToken) {
        this.fbToken = fbToken;
    }

    getToken() {
    return this.fbToken;
    }
}
/*****************/

app.get('/getPlayable/:apitoken', function (req, res) {
       for(var i=0;i< token.length;i++) {
       		if(token[i]==req.params.apitoken){
			res.end("Your FB-Token is:"+dpMap[token[i]].getToken());
		}
       }
       res.end("Invalid API Key" );
})

app.get('/getAllKeys', function (req, res) {
       res.end(token.toString());
})

app.post('/addToken', function (req, res) {
       // Generate a DataProvider for each Token
	   if(token.length <5){
		   var tok = apitoken.generate(16);
		   token.push(tok);
		   dpMap[tok] = new DataProvider(req.body.token);
		   res.end("\n\nYour API token is:"+tok+"\n\n");
	   }
	   else{
		   res.end("\n\nReached max number of users\n\n");
	   }
})

var server = app.listen(8080, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("MyPi Server listening at http://%s:%s", host, port)

})
