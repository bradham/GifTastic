//Array for all buttons
var topics = ["Boba Fett", "Luke", "Chewbacca", "Rey", "speeder", "Han Solo", "Darth Vader", "Anakin", "Yoda"];


function renderButtons() {

  // Deleting the buttons prior to adding new topics
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-list").empty();

  // Looping through the array of topics
  for (var i = 0; i < topics.length; i++) {

    // Then dynamically generating buttons for each topic in the array
    var a = $("<button>");
    // Adding a class of topic and Bootstrap butons and margins to our button
    a.addClass("topic btn btn-primary m-2");
    // Adding a data-attribute
    a.attr("data-name", topics[i]);
    // Providing the initial button text
    a.text(topics[i]);
    // Adding the button to the buttons-list div
    $("#buttons-list").append(a);
  }
}

// Function for dumping the JSON content for each button into the div
function displayTopicInfo() {

  $("#giphs-view").empty();

  var topic = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?apikey=Ab6N6BpDEAK7ZXDlD0R2FwxpnJeZFKOK&q=starwars+" + topic + "&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    var results = response.data;

    // Looping over every result item
    for (var i = 0; i < results.length; i++) {

      // For only taking action if the photo has an appropriate rating
      // Removed rating so that 10 items display. If rating is added then
      // a counter should be created to produce 10 items
      //if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

      // Creating a div for the giph
      var gifDiv = $("<div>");

      //add a Bootstrap class to float giphs
      gifDiv.addClass("float-left");

      // Storing the result item's rating
      var rating = results[i].rating;

      // Creating a paragraph tag with the result item's rating
      var p = $("<p>").text("Rating: " + rating);

      // Creating an image tag
      var topicImage = $("<img>");
      topicImage.addClass("giph");

      //initialize state to still/paused
      topicImage.attr("data-state", "still");

      //set the img attributes for the stopped and play giphs urls
      topicImage.attr("data-animate", results[i].images.fixed_height.url);
      topicImage.attr("data-still", results[i].images.fixed_height_still.url);

      // Giving the image tag an src attribute of a proprty pulled off the
      // result item of the still image
      topicImage.attr("src", results[i].images.fixed_height_still.url);

      // Appending the paragraph and personImage we created to the "gifDiv" div we created
      gifDiv.append(p);
      gifDiv.append(topicImage);

      // Prepending the giphDiv to the "#gifs-appear-here" div in the HTML
      $("#giphs-view").prepend(gifDiv);

      //End of if rating statement  }

      //For debugging API object
      //console.log(response.data[i]);
    }
  });
}

// Function for displaying the topic's giph
// Using $(document).on instead of $(".topic").on to add event listeners to dynamically generated elements
$(document).on("click", ".topic", displayTopicInfo);

//Listener to start and stop a giph
$(document).on("click", ".giph", function () {
  // Make a variable named state and then store the image's data-state into it.
  var state = $(this).attr("data-state");

  // Check if the variable state is equal to 'still',
  // then update the src attribute of this image to it's data-animate value,
  // and update the data-state attribute to 'animate'.
  // If state is equal to 'animate', then update the src attribute of this
  // image to it's data-still value and update the data-state attribute to 'still'
  if (state === "still") {
    $(this).attr("data-state", "animate");
    $(this).attr("src", $(this).attr("data-animate"));
  }
  else {
    $(this).attr("data-state", "still");
    $(this).attr("src", $(this).attr("data-still"));

  }
});

//Take the user input of the new button to add
$("#add-topic").on("click", function (event) {
  event.preventDefault();

  // This line grabs the input from the textbox
  var newTopic = $("#topic-input").val().trim();

  // Adding the topic from the textbox to the buttons array
  topics.push(newTopic);
  console.log(topics);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});

//Call the function to intialize the buttons from the topics array
renderButtons();
