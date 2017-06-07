
'use strict';
const News = require('../data/news.js');
var https = require('https');


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
	
		this.newsList=[]
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
		if (this.relevantProvider.length > 0)
		{
			for (var provIndex=0; provIndex < this.relevantProvider.length; provIndex++)
			{
				console.log(this.relevantProvider[provIndex]);
				console.log(this.newsMap[this.relevantProvider[provIndex]])
				
				
				//get current provider url
				var curProvider=this.newsMap[this.relevantProvider[provIndex]];	
				
				//get latest news
				https.get(curProvider, (res) => {
				  res.on('data', (d) => {
					this.resp = d;
					console.log('data:', d);
					var temp = JSON.parse(this.resp);
					//filter news by keyword
					var filteredNews=this.FilterNewsByKeyWords(temp);
					
					
					//add to playables list
					var newNews=this.ConvertToNews(filteredNews, this.relevantProvider[provIndex]);
					this.newsList=this.newsList.concat(newNews);
				  });
				});
				
				
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
			//go through all keywords
			for (var keyWordIndex = 0; keyWordIndex < this.keyWords.length; keyWordIndex++)
			{
				//check if keyword is in description
				if(jsonList['articles'][i].description.includes(this.keyWords[keyWordIndex]))
				{
					//todo: mark keyword as found
					console.log(jsonList['articles'][i])
					filteredList.push(jsonList['articles'][i]);
					break;
				}
			}
		}
		
		return filteredList;
	}
	
	ConvertToNews (filteredNews, providerName)
	{
		var newsPlayAbles = [];
		
		console.log("filteredNews: " + filteredNews)
		console.log("filteredNews length: " + filteredNews.length)
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