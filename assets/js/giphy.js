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

var topics = ["Boba Fett", "Luke", "Chewbacca", "Rey", "speeder"];


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
//TO DO: overwrite/refresh results displayed after button is clicked
function displayTopicInfo() {

    $("#giphs-view").empty();

    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?apikey=Ab6N6BpDEAK7ZXDlD0R2FwxpnJeZFKOK&q=starwars+" + topic + "&limit=10";

    //Example from omdb api
    // "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data;

        // Looping over every result item
        for (var i = 0; i < results.length; i++) {

            // Only taking action if the photo has an appropriate rating
            // Removed rating so that 10 items display. If rating is added then
            // a counter should be created to produce 10 items
            //if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                // Creating a div for the gif
                var gifDiv = $("<div>");

                //add a Bootstrap class to float gifs
                gifDiv.addClass("float-left");

                // Storing the result item's rating
                var rating = results[i].rating;

                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + rating);

                // Creating an image tag
                var topicImage = $("<img>");

                // Giving the image tag an src attribute of a proprty pulled off the
                // result item
                topicImage.attr("src", results[i].images.fixed_height.url);

                // Appending the paragraph and personImage we created to the "gifDiv" div we created
                gifDiv.append(p);
                gifDiv.append(topicImage);

                // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                $("#giphs-view").prepend(gifDiv);
            
            //End of if rating statement  }


            /*           // Saving the image_original_url property
                      var imageUrl = response.data[i].image_original_url;
            
                      // Creating and storing an image tag
                      var giph = $("<img>");
            
                      // Setting the giph src attribute to imageUrl
                      giph.attr("src", imageUrl);
                      giph.attr("alt", "star wars image");
            
                      // Prepending the giph to the images div
                      $("#giphs-view").prepend(giph);
             */
            //$("#giphs-view").text(JSON.stringify(response));
            console.log(response.data[i]);
        }
    });
}

// Function for displaying the topic's gif
// Using $(document).on instead of $(".topic").on to add event listeners to dynamically generated elements
$(document).on("click", ".topic", displayTopicInfo);

renderButtons();
