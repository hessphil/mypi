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
var filter="FC Bayern";

function getNews(){
	var url1='https://newsapi.org/v1/articles?source=bild&sortBy=latest&apiKey=298ff739e4364254a522a26fc88466da';
	var url2='https://newsapi.org/v1/articles?source=spiegel-online&sortBy=top&apiKey=298ff739e4364254a522a26fc88466da';
	var url3='https://newsapi.org/v1/articles?source=focus&sortBy=top&apiKey=298ff739e4364254a522a26fc88466da';
	
	getTheLatest(url1);
	getTheLatest(url2);
	getTheLatest(url3);

}

function getTheLatest(url){
	var xhr = createCORSRequest('GET', url);
	xhr.send();
	var response
	// Response handlers.
	xhr.onload = function() {
    response = xhr.responseText;
	response = JSON.parse(response);
	var arrayLength = response.articles.length;
	for (var i = 0; i < arrayLength; i++)
	{
		if(response.articles[i].description.includes(filter)){
			responsiveVoice.speak(response.articles[i].title,"Deutsch Female");
			responsiveVoice.speak(response.articles[i].description,"Deutsch Female");
			responsiveVoice.speak("Du möchtest mehr erfahren? Dann klick weiter","Deutsch Female");
		}
		
	}
	};
}