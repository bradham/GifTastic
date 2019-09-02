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

 renderButtons();
 
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
