count = 0 // number of input spaces
var last_input = document.getElementById('site'+count.toString())
add_input(); //add first input space

// Event listeners for clicking the two buttons
document.addEventListener("DOMContentLoaded", function() {
	var start_button = document.getElementById('start_button');
	start_button.addEventListener('click', start_session);
	var add_button = document.getElementById('add_button');
	add_button.addEventListener('click', add_input);
	last_input.addEventListener("keydown", check_tab);
});

// Starts the session (close prompt window, start timer,
// tells background to initialize blocked sites)
function start_session() {
	if(document.getElementById('time').value == ''){
		window.alert("Please enter a session length.");
	}
	else if(document.getElementById('time').value < 0) {
		window.alert("Please enter a valid session length.");
	}
	else {
		window.alert("Get studying!");
		window.close();
		chrome.browserAction.setPopup({popup: "popup_active.html"});
		var list = []
		document.getElementsByName('site').forEach(function (site) {
			if (site.value.localeCompare("") != 0) {
				url_1 = "https://www." + site.value;
				url_2 = "https://" + site.value;
				url_3 = site.value;
				list.push(url_1);
				list.push(url_2);
				list.push(url_3);
			}
		});
		chrome.runtime.sendMessage({message: "start session",
			time: document.getElementById('time').value, 
			sites: list});
	}
}

// Create new blank for website input
function add_input() {
	count += 1
	//input space
	var input = document.createElement("input");
	input.type="text";
	input.name="site";
	input.id="site"+count.toString();
	// clear button
	var clear = document.createElement("BUTTON");
	clear.innerHTML = "  &times";
	clear.className = "clear_button";
	clear.id = "clear"+count.toString();
	clear.tabIndex = -1;
	clear.addEventListener('click', function() {remove_input(parseInt(clear.id.substring(5)))});

	var container = document.getElementById("container");
	var group = document.createElement("div");
	group.id = "group"+count.toString();
	group.appendChild(input);
	group.appendChild(clear);
	group.appendChild(document.createElement("br"));
	group.appendChild(document.createElement("br"));
	container.appendChild(group);
	update_last_input();
}

// find last input
function update_last_input() {
	if(count > 1) {
		last_input.removeEventListener("keydown", check_tab);
	}
	last_input = document.getElementById('site'+count.toString())
	last_input.addEventListener("keydown", check_tab);
}

// check if key press is tab key
function check_tab(key) {
	if(key.code=='Tab') {
		add_input();
	}
}

// remove an input when clear is clicked
function remove_input(index) {
	if(count == 1) {
		document.getElementById('site1').value = "";
	}
	else {
		var container = document.getElementById("container");
		var group = document.getElementById('group'+index.toString());
		container.removeChild(group);
		for (i = index + 1; i <= count; i++) {
			group = document.getElementById('group'+i.toString());
			new_i = i-1;
			group.id = "group"+new_i.toString();
			group.children[0].id = "site"+new_i.toString();
			group.children[1].id = "clear"+new_i.toString();
		}
		count -= 1;
		console.log(container);
		console.log(index);
		update_last_input();
	}
}