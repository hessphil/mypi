var express = require('express');
var app = express();
var fs = require("fs");
var apitoken = require('rand-token');
var DataProvider = require('./dataprovider/dataProvider.js');
const News = require('./dataprovider/data/news.js');

var bodyParser = require('body-parser');
app.use( bodyParser.json() );


// Besser eine DataProviderManagement?!
var dpMap = {};
var token = [];


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/getNews/:apitoken', function (req, res) {
       for(var i=0;i< token.length;i++) {
       		if(token[i]==req.params.apitoken){
				res.end(JSON.stringify(dpMap[token[i]].transmitNewsPlayables()));
			}
       }
	   
       res.end("Invalid API Key" );
})

app.get('/getSongs/:apitoken', function (req, res) {
       for(var i=0;i< token.length;i++) {
       		if(token[i]==req.params.apitoken){
				//console.log(dpMap[token[i]].transmitPlayables());
				//res.end(dpMap[token[i]].transmitPlayables());
				console.log(createDummyPlayables ());
				res.end(JSON.stringify(createDummyPlayables ()));
			}
       }
       res.end("Invalid API Key" );
})

app.get('/getAllKeys', function (req, res) {
       res.end(token.toString());
})

app.get('/getDataProvider', function (req, res) {
		myDataProvider= new DataProvider("test");
       myDataProvider.get();

})

app.post('/addToken', function (req, res) {
       // Generate a DataProvider for each Token
	   if(token.length <5){
			var tok = apitoken.generate(16);
			token.push(tok);
			dpMap[tok] = new DataProvider(req.body.token);
			res.end(tok);
	   }
	   else{
		   res.end("\n\nReached max number of users\n\n");
	   }
})

var server = app.listen(8080, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("MyPi Server listening at http://%s:%s", host, port)

  setInterval(updateDataProviders, 5000);
})

function updateDataProviders()
{
	//console.log('server::updateDataProviders');
	
	for (var dp in dpMap)
	 {
		 //console.log('server::d'+dpMap[dp]);
		dpMap[dp].run();
	 }
}

function createDummyPlayables () {
	var news = new News();
	news.text = "Na du wie geht es dir heute"
	news.title = "Fake News"
	news.provider = "Malle News"
	news.source = "boa ne iwas"
	news.imageUrl = "pfad zum bild"
	return news;
}
