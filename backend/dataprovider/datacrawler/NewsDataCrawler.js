
'use strict';
const News = require('../data/news.js');
var https = require('https');
const request = require('request-promise');  

class NewsDataCrawler{
	//Variables
	//Map with all Providers
	

	 constructor(){	
		this.relevantProvider = [];
		this.keyWords=[];
		
		this.newsMap = {"spiegel":"https://newsapi.org/v1/articles?source=spiegel-online&sortBy=top&apiKey=298ff739e4364254a522a26fc88466da",
		"bild":"https://newsapi.org/v1/articles?source=bild&sortBy=latest&apiKey=298ff739e4364254a522a26fc88466da",
		"focus":"https://newsapi.org/v1/articles?source=focus&sortBy=top&apiKey=298ff739e4364254a522a26fc88466da",
		"tagesspiegel":"https://newsapi.org/v1/articles?source=der-tagesspiegel&sortBy=latest&apiKey=298ff739e4364254a522a26fc88466da",
		"zeit":"https://newsapi.org/v1/articles?source=die-zeit&sortBy=latest&apiKey=298ff739e4364254a522a26fc88466da"};
	
		this.newsList=[];
		this.newsPlayableArrayHistory = [];
		this.lastProvider;
	}

	//SetRelevantProvider
	setRelevantProviders(providerNames)
	{
		//wrap provider fb names to newsapi names
		for (var provIndex=0; provIndex < providerNames.length; provIndex++)
		{
			
			if(providerNames[provIndex]=="SPIEGEL ONLINE")
			{
				this.relevantProvider=this.relevantProvider.concat("spiegel");
			}
			else if(providerNames[provIndex]=="ZEIT ONLINE")
			{
				this.relevantProvider=this.relevantProvider.concat("zeit");
			}
			else if(providerNames[provIndex]=="Bild")
			{
				this.relevantProvider=this.relevantProvider.concat("bild");
			}
			else if(providerNames[provIndex]=="FOCUS Online")
			{
				this.relevantProvider=this.relevantProvider.concat("focus");
			}
			else if(providerNames[provIndex]=="Tagesspiegel")
			{
				this.relevantProvider=this.relevantProvider.concat("tagesspiegel");
			}
		}
	}
	
	addKeyWords(keyWords)
	{
		this.keyWords=this.keyWords.concat(keyWords);
	}
	
	
	//get news from each relevant provider
	getPlayables (callbackfunction)
	{
		if (this.relevantProvider.length > 0)
		{
			for (var provIndex=0; provIndex < this.relevantProvider.length; provIndex++)
			{
				//console.log(this.relevantProvider[provIndex]);
				//console.log(this.newsMap[this.relevantProvider[provIndex]])
				
				
				//get current provider url
				var curProvider=this.newsMap[this.relevantProvider[provIndex]];	
				this.lastProvider=this.relevantProvider[provIndex];
				
				//get latest news
				const options = {
					method: 'GET',
					uri: curProvider,
					};
					
					request(options)
					.then(function(d) {
						this.resp = d;
						//console.log('data:', d);
						var temp = JSON.parse(this.resp);
						var provider = temp.source;
						//filter news by keyword
						var filteredNews=this.FilterNewsByKeyWords(temp);
							
						//add to playables list
						var newNews=this.ConvertToNews(filteredNews, provider);
						//this.newsList=this.newsList.concat(newNews);
						//console.log(this.newsList);
						callbackfunction(newNews);
						
					}.bind(this));
				
				
				// this.getTheLatest(curProvider,provIndex).then(() => {return this.newsList});
			}
		}
		//if selected provider ==0 go through all providers
		//check if keyword is in article description
	}
	
	//gets all news for keyword
	FilterNewsByKeyWords(jsonList)
	{
		//filtered News
		var filteredList=[];
		
		var arrayLength =jsonList['articles'].length;
		for (var i = 0; i < arrayLength; i++)
		{
			//console.log(this.keyWords);
			//go through all keywords
			for (var keyWordIndex = 0; keyWordIndex < this.keyWords.length; keyWordIndex++)
			{
				//check if keyword is in description
				if((jsonList['articles'][i].description.includes(this.keyWords[keyWordIndex]))||jsonList['articles'][i].title.includes(this.keyWords[keyWordIndex]))
				{
					//todo: mark keyword as found
					//console.log(jsonList['articles'][i])
					//console.log("newsdatacrawler: newsPlayableArrayHistory:"+this.newsPlayableArrayHistory);
					if(this.newsPlayableArrayHistory.indexOf(jsonList['articles'][i].url) > -1)
					{
						//console.log("newsdatacrawler: newsPlayableArrayHistory continue:");
						continue;
					}
					filteredList.push(jsonList['articles'][i]);
					this.newsPlayableArrayHistory.push(jsonList['articles'][i].url);
					break;
				}
			}
		}
		
		return filteredList;
	}
	
	ConvertToNews (filteredNews, providerName)
	{
		var newsPlayAbles = [];
		
		//console.log("filteredNews: " + filteredNews)
		//console.log("filteredNews length: " + filteredNews.length)
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