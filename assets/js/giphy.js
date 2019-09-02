/* 
dynamic buttons
populate initial array
loop through array to create buttons
limit of 10 giphs
if giph !running then click giph start
if giph running then click giph stop
input to add to array
button submit to add to array
 */

var topics = ["Boba Fett", "Luke", "Chewbacca"];


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

var topic = $(this).attr("data-name");
var queryURL = "https://api.giphy.com/v1/gifs/random?apikey=Ab6N6BpDEAK7ZXDlD0R2FwxpnJeZFKOK&tag=starwars"

//Example from omdb api
// "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
          // Saving the image_original_url property
          var imageUrl = response.data.image_original_url;

          // Creating and storing an image tag
          var giph = $("<img>");

          // Setting the giph src attribute to imageUrl
          giph.attr("src", imageUrl);
          giph.attr("alt", "star wars image");

          // Prepending the giph to the images div
          $("#giphs-view").prepend(giph);

    //$("#giphs-view").text(JSON.stringify(response));
    console.log(response);
});
}

// Function for displaying the topic's gif
// Using $(document).on instead of $(".topic").on to add event listeners to dynamically generated elements
$(document).on("click", ".topic", displayTopicInfo);

renderButtons();
