var newsMap = new Map([["spiegel","https://newsapi.org/v1/articles?source=spiegel-online&sortBy=top&apiKey=298ff739e4364254a522a26fc88466da"],
["bild","https://newsapi.org/v1/articles?source=bild&sortBy=latest&apiKey=298ff739e4364254a522a26fc88466da"],
["focus","https://newsapi.org/v1/articles?source=focus&sortBy=top&apiKey=298ff739e4364254a522a26fc88466da"],
["tagesspiegel","https://newsapi.org/v1/articles?source=der-tagesspiegel&sortBy=latest&apiKey=298ff739e4364254a522a26fc88466da"],
["zeit","https://newsapi.org/v1/articles?source=die-zeit&sortBy=latest&apiKey=298ff739e4364254a522a26fc88466da"]]);

var  response = [];

// Create the XHR object.
function createCORSRequest(method, url) {
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

var validNews;
var filter="Trump";

function getNews(){
	response = [];
	for (let url of newsMap){
		getTheLatest(url[1]);
	}
}

function getTheLatest(url){
	var xhr = createCORSRequest('GET', url);
	xhr.send();
	// Response handlers.
	xhr.onload = function() {
    var string = xhr.responseText;
	var temp = JSON.parse(string);
	response.push(temp);
	
	
	};
}

function playTheNews(){
	console.log("Fick dick");
	var readNews = response;
	var responseLength = readNews.length;
	for (var a=0; a < responseLength; a++)
	{
		var arrayLength = readNews[a].articles.length;
		for (var i = 0; i < arrayLength; i++)
		{
			if(readNews[a].articles[i].description.includes(filter)){
				responsiveVoice.speak(readNews[a].articles[i].title,"Deutsch Female");
				responsiveVoice.speak(readNews[a].articles[i].description,"Deutsch Female");
				responsiveVoice.speak("Du möchtest mehr erfahren? Dann klick weiter","Deutsch Female");
			}
		}
	}
	
}