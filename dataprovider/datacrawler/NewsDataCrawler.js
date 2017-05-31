
'use strict';
const News = require('../data/news.js');


var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

class NewsDataCrawler{
	//Variables
	//Map with all Providers
	

	 constructor(){	
	this.relevantProvider = [];
	this.keyWords=[];
	
	this.newsMap = new Map([["spiegel","https://newsapi.org/v1/articles?source=spiegel-online&sortBy=top&apiKey=298ff739e4364254a522a26fc88466da"],
	["bild","https://newsapi.org/v1/articles?source=bild&sortBy=latest&apiKey=298ff739e4364254a522a26fc88466da"],
	["focus","https://newsapi.org/v1/articles?source=focus&sortBy=top&apiKey=298ff739e4364254a522a26fc88466da"],
	["tagesspiegel","https://newsapi.org/v1/articles?source=der-tagesspiegel&sortBy=latest&apiKey=298ff739e4364254a522a26fc88466da"],
	["zeit","https://newsapi.org/v1/articles?source=die-zeit&sortBy=latest&apiKey=298ff739e4364254a522a26fc88466da"]]);
	}
	
	//Methods
	// Create the XHR object.
	createCORSRequest(method, url) 
	{
	  var xhr = new XMLHttpRequest();
	  if ("withCredentials" in xhr) {
		// XHR for Chrome/Firefox/Opera/Safari.
		xhr.open(method, url, true);
	  } else if (typeof XDomainRequest != "undefined") {
		// XDomainRequest for IE.
		xhr = new XDomainRequest();
		xhr.open(method, url);
	  } else {
		// CORS not supported.
		xhr = null;
	  }
	  return xhr;
	}

	//SetRelevantProvider
	setRelevantProvider(providerName)
	{
		this.relevantProvider.push(providerName);
	}
	
	addKeyWord(keyWord)
	{
		this.keyWords.push(keyWord);
	}
	
	//get news from each relevant provider
	getPlayables ()
	{
		var playables=[];
		if (this.relevantProvider.length > 0)
		{
			for (var provIndex=0; provIndex < this.relevantProvider.length; provIndex++)
			{
				//get current provider url
				var curProvider=this.newsMap[this.relevantProvider[provIndex]];	
				
				//get latest news
				var jsonList=this.getTheLatest(curProvider);
				
				//filter news by keyword
				var filteredNews=this.FilterNewsByKeyWords(jsonList);
				
				//add to playables list
				var newPlayables=this.ConvertToPlayables(filteredNews, this.relevantProvider[provIndex]);
				playables=playables.concat(newPlayables);
			}
		}
		//if selected provider ==0 go through all providers
		//check if keyword is in article description
	}
	//GetNews
	getTheLatest(url){
		var xhr = this.createCORSRequest('GET', url);
		xhr.send();
		// Response handlers.
		xhr.onload = function() 
		{
		var string = xhr.responseText;
		var temp = JSON.parse(string);
		return temp;
		};
	}
	
	//gets all news for keyword
	FilterNewsByKeyWords(jsonList)
	{
		//filtered News
		var filteredList=[];
		
		var arrayLength =jsonList.articles.length;
		for (var i = 0; i < arrayLength; i++)
		{
			//go through all keywords
			for (var keyWordIndex = 0; keyWordIndex < this.keyWords.length; keyWordIndex++)
			{
				//check if keyword is in description
				if(jsonList.articles[i].description.includes(keyWords[keyWordIndex]))
				{
					//todo: mark keyword as found
					
					filteredList.push(jsonList.articles[i]);
					break;
				}
			}
		}
	}
	
	ConvertToPlayables (filteredNews, providerName)
	{
		var newsPlayAbles = [];
		
		for (var newsIndex=0; newsIndex < filteredNews.length; newsIndex++)
			{
				var curNews = new News();
				
				//fill news with data
				curNews.title = filteredNews[newsIndex].title;
				curNews.source = filteredNews[newsIndex].url;
				curNews.provider = providerName;
				curNews.text = filteredNews[newsIndex].description;
				curNews.imageUrl = filteredNews[newsIndex].urlToImage;
				
				//add news to list
				newsPlayAbles.push(curNews);
			}
			//return list of playables
			return newsPlayAbles;
	}
	
}

module.exports = NewsDataCrawler;