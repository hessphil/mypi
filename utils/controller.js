
// Synchronous http request
function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

// Function to query playables from server
function getPlayablesFromServer()
{
	// Read the API token from Cookie
	
	// Query data until we get a valid response
	var x = document.cookie
	var url = "http://localhost:8080/getPlayable/" + x.split("=")[1];
	var jsonNewsTest = JSON.parse(httpGet(url));
	console.log(jsonNewsTest);
	
}

