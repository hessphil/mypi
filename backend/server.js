var express = require('express');
var app = express();
var fs = require("fs");
var apitoken = require('rand-token');
var DataProvider = require('./dataprovider/dataProvider.js');

var bodyParser = require('body-parser');
app.use( bodyParser.json() );


// Besser eine DataProviderManagement?!
var dpMap = {};
var token = [];


app.get('/getPlayable/:apitoken', function (req, res) {
       for(var i=0;i< token.length;i++) {
       		if(token[i]==req.params.apitoken){
			res.end("Your FB-Token is:"+dpMap[token[i]].fbDataCrawler.getPlayables());
		}
       }
       res.end("Invalid API Key" );
})

app.get('/getAllKeys', function (req, res) {
       res.end(token.toString());
})

app.get('/testFB', function (req, res) {
		var tok = apitoken.generate(16);
		token.push(tok);
		dpMap[tok] = new DataProvider('EAACEdEose0cBAJe23ARF3AR9BF7glAZAdnxWd7BPnZC7N3OF1BS9fQPyFTEUf7FNiVdfb8cEZAIbSalims3TXlSeohDfNkYoZChyVwQuRVc7C5KkZAFjXqObkrs9qU3fO6Lg4qCFCDs08t5NGufdgwR1pvstft9iSDgk62G2vorL5gekZAiZCcpiHfqyceGMJR8JNzVusNgdQZDZD');
       res.end('Test');
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
