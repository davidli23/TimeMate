// Request list of blocked sites from background
chrome.runtime.sendMessage({message: "get blocked sites"}, function(response) {
	if (!response.paused) {
	  	response.sites.forEach(function(site) {
	    	findAllURL(site);
	    });
	}
});

// BLOCK THE ENTIRE DOMAIN WITH THE FOLLOWING FUNCTION
findAllURL = function changeAllURL(text){
  var current = window.location.href;
  if(current.startsWith(text)){
    document.open();
    document.write('<!DOCTYPE html><html><head><link href="main.css" rel="stylesheet" type="text/css" /></head><body><p>Don\'t lose focus now! Keep it up!</p></body></html>');
    document.close();
  }
}