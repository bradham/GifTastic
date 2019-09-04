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
                topicImage.addClass("giph");
                //initialize state to still/paused
                topicImage.attr("data-state", "still");
                //set the img attributes for the paused and play giphs urls
                topicImage.attr("data-animate", results[i].images.fixed_height.url);
                topicImage.attr("data-still", results[i].images.fixed_height_still.url);

                // Giving the image tag an src attribute of a proprty pulled off the
                // result item of the still image
                topicImage.attr("src", results[i].images.fixed_height_still.url);
                //topicImage.attr("src", results[i].images.fixed_height.url);

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
            
            //For debugging API object
            //console.log(response.data[i]);
        }
    });
}

// Function for displaying the topic's gif
// Using $(document).on instead of $(".topic").on to add event listeners to dynamically generated elements
$(document).on("click", ".topic", displayTopicInfo);
$(document).on("click", ".giph", function() {
    // STEP ONE: study the html above.
    // Look at all the data attributes.
    // Run the file in the browser. Look at the images.

    // After we complete steps 1 and 2 we'll be able to pause gifs from giphy.

    // STEP TWO: make a variable named state and then store the image's data-state into it.
    // Use the .attr() method for this.

    // ============== FILL IN CODE HERE FOR STEP TWO =========================

    var state = $(this).attr("data-state");

    // =============================================

    // STEP THREE: Check if the variable state is equal to 'still',
    // then update the src attribute of this image to it's data-animate value,
    // and update the data-state attribute to 'animate'.

    // If state is equal to 'animate', then update the src attribute of this
    // image to it's data-still value and update the data-state attribute to 'still'
    // ============== FILL IN CODE HERE FOR STEP THREE =========================

    if (state === "still") {
      $(this).attr("data-state", "animate");
      $(this).attr("src", $(this).attr("data-animate"));
    }
    else {
      $(this).attr("data-state", "still");
      $(this).attr("src", $(this).attr("data-still"));

    }

    // ==============================================

    // STEP FOUR: open the file in the browser and click on the images.
    // Then click again to pause.
  });

  $("#add-topic").on("click", function(event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    var newTopic = $("#topic-input").val().trim();

    // Adding the topic from the textbox to the buttons array
    topics.push(newTopic);
    console.log(topics);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
  });



renderButtons();
