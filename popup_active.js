pause_button = "Pause";
play_button = "Continue";


chrome.runtime.sendMessage({message: "get paused"}, function(response) {
	if (!response.paused) {
		document.getElementById('pause').innerHTML = pause_button;
		document.getElementById('time_left').classList.add("time_text");
	}
	else {
		document.getElementById('pause').innerHTML = play_button;
		document.getElementById('time_left').classList.add("time_text_paused");
	}
});

chrome.runtime.sendMessage({message: "get tick"}, function(response) {
  	document.getElementById('time_left').innerHTML = convertTime(response.time+10);
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.message == "tick") {
		var paused;
		chrome.runtime.sendMessage({message: "get paused"}, function(response) {
			paused = response.paused;
		});
		if (!paused) {
			document.getElementById('time_left').innerHTML = convertTime(request.time);
		}
	}
	if (request.message == "close popup") {
		window.close();
	}
	if (request.message == "switch pause") {
		if (request.paused) {
			document.getElementById('pause').innerHTML = pause_button;
			document.getElementById('time_left').classList.remove("time_text_paused");
			document.getElementById('time_left').classList.add("time_text");
		}
		else {
			document.getElementById('pause').innerHTML = play_button;
			document.getElementById('time_left').classList.remove("time_text");
			document.getElementById('time_left').classList.add("time_text_paused");
		}
	}
});

document.getElementById('pause').addEventListener('click', function() {
	playPause();
});

function convertTime(time) {
	time = Math.floor(time/10);
    var hours   = Math.floor(time / 3600);
    var minutes = Math.floor((time - (hours * 3600)) / 60);
    var seconds = time - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}

function playPause() {
	chrome.runtime.sendMessage({message: "play pause"});
}