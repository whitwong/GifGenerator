/**Global Variables**/
var topics, newButton, newTopic, queryURL, heroName, results, heroDiv, rating, gifShow, state;

/**Starter array that holds hero items**/
topics = ["The Hulk", "Batman", "Superman", "The Flash", "Starlord", "Gambit", "Drax", "Wolverine"];

/**Function to create buttons and clear buttons from screen on every reload**/
function makeButtons() {
	//Clears #buttons area for when new buttons are added
	$("#buttons").html("");

	//Loop through topics array to make each button
	for (var i=0; i<topics.length; i++) {
		newButton = $("<button>" + topics[i] + "</button>");
		newButton.attr("data-name", topics[i]);
		newButton.addClass("heroes");
		$("#buttons").append(newButton);
	};
};

/**On-click event for adding new buttons**/
$("#add-hero").on("click", function(event){
	event.preventDefault();

	//Take in user input and push to topics array
	//Also clear user input after value is stored
	newTopic = $("#user-input").val();
	$("#user-input").val("");
	topics.push(newTopic);
	makeButtons();
});

/**Function for displaying gifs -- ajax request**/
function displayGifs(){
	//Clear #gifs area when new hero button is selected
	$("#gifs").html("");

	//Create queryURL using the name of the hero
	heroName = $(this).attr("data-name");
	queryURL = "https://api.giphy.com/v1/gifs/search?q=" + heroName + "&api_key=dc6zaTOxFJmzC&limit=10";
	
	//Ajax request
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){
		//Store response.data in a new variable
		results = response.data;

		//Loop to access each array in the returned object
		for(var j=0; j<results.length; j++){

			heroDiv = $("<div class='hero'>");
			$("#gifs").append(heroDiv);

			//Store and append rating information
			rating = $("<div>Rating: " + results[j].rating + "</div>");
			//$("#gifs").append(rating);

			//Store and append gifs. Give attributes to gifs for toggling state later
			gifShow = $("<img data-state='still' src='" + results[j].images.fixed_height_still.url + "'>");
			gifShow.attr("data-still", results[j].images.fixed_height_still.url);
			gifShow.attr("data-animate", results[j].images.fixed_height.url);
			gifShow.addClass("gif");

			//$("#gifs").append(gifShow);
			heroDiv.append(rating);
			heroDiv.append(gifShow);
		};
	});
};

/**Function for start/stop gifs**/
function animateGif(){
	//Set state variable to whatever the data-state is of the selected gif
	state = $(this).attr("data-state");

	//Condition to toggle between still and animated states
	if (state === "still") {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	}
	else {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}
}

/**Call functions for on-click events -- event delegation**/
makeButtons();
$(document).on("click", ".heroes", displayGifs);
$(document).on("click", ".gif", animateGif);