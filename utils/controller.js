// Synchronous http request
var counter=0;
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
	var url = "http://localhost:8080/getNews/" + x.split("=")[1];
	var jsonNewsTest = JSON.parse(httpGet(url));
	//console.log(jsonNewsTest);
	return jsonNewsTest;
}
function insertAfter(newElement,targetElement) {
    // target is what you want it to go after. Look for this elements parent.
    var parent = targetElement.parentNode;

    // if the parents lastchild is the targetElement...
    if (parent.lastChild == targetElement) {
        // add the newElement after the target element.
        parent.appendChild(newElement);
    } else {
        // else the target has siblings, insert the new element between the target and it's next sibling.
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}


function addPlayableDiv(img_url,content)
{
	var div = document.createElement('div');
	var img = document.createElement('img');
	var div_detail = document.createElement('div');
	var img_src = document.createElement('img');
	var strong = document.createElement('strong');
	
	if(content.length> 35)
	{
		content = content.substring(0,35);
	}
	
	img.src=img_url;
	img.className="preview-img";
	
	div_detail.className="details";
	
	strong.innerHTML=content;
	div_detail.appendChild(strong);
	
	img_src.src="../pics/spiegel.svg";
	img_src.className="pull-right preview-src-spiegel";
	
	if(counter%2==0)
	{
		div.className="playable equal";
	}
	else
	{
		div.className="playable";
	}
	div.appendChild(img);
	div.appendChild(div_detail);
	div.appendChild(img_src);
	
	var parent = document.getElementById('playCon');
	insertAfter(div, parent.lastChild);
	counter++;
}

function removePlayableDiv()
{
	
	var parent = document.getElementById('playCon');
	parent.removeChild(parent.childNodes[0]);
	counter--;
}

function queryAndInsert()
{
	var playables;
	playables=getPlayablesFromServer();
	for (var pl=0;pl<playables.length;pl++)
	{
		console.log(playables[pl].imageUrl);
		addPlayableDiv(playables[pl].imageUrl,playables[pl].title);
	}
	
}

