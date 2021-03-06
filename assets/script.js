var heros = ["Batman", "Superman", "Aquaman", "Wonder Woman", "The Flash", "Black Panther", "Thor", "Spider-Man", "Iron Man", "Capitan America"];

// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayHeroInfo() {

  var hero = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + hero + "&api_key=dc6zaTOxFJmzC&limit=10";

  // Creating an AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  })
  .then(function(response) {

      var results = response.data;

      for (var i = 0 ; i < results.length; i++) {
          if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

              var heroDiv = $("<div class='hero'>");

              var rating = results[i].rating;

              var pOne = $("<p>").text("Rating: " + rating);

              var personImage = $("<img>");

              // personImage.attr("src", results[i].images.fixed_height.url);
           personImage.attr("src", results[i].images.fixed_height_still.url);
           personImage.attr("data-still", results[i].images.fixed_height_still.url);
           personImage.attr("data-animate", results[i].images.fixed_height.url);
           personImage.attr("data-state", "still");
           personImage.addClass("personImage");

              heroDiv.append(pOne);
              heroDiv.append(personImage);

              $("#hero-view").prepend(heroDiv);
          }
      }
  });

}

//   <img src="url" 
// data-still="url" 
// data-animate="url" 
// data-state="still">
$(".personImage").on("click", function() {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });


// Function for displaying movie data
function renderButtons() {

  // Deleting the movies prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of movies
  for (var i = 0; i < heros.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of movie-btn to our button
    a.addClass("hero-btn");
    // Adding a data-attribute
    a.attr("data-name", heros[i]);
    // Providing the initial button text
    a.text(heros[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where a movie button is clicked
$("#add-hero").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var hero = $("#hero-input").val().trim();

  // Adding movie from the textbox to our array
  heros.push(hero);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".hero-btn", displayHeroInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();


