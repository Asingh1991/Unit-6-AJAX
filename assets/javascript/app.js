$(document).ready(function() {
var movies = ["The Godfather", "Inception", "Forest Gump", "The shawshank redemption", "Rocky"];

//button to be added for movies in array and new movies added to array
function makeButtons() {
    $("#buttons").empty();

    for (var i = 0; i < movies.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("btn btn-success movieButton");
        newButton.attr("data-movie", movies[i]);
        newButton.text(movies[i]);
        $("#buttons").append(newButton);
    }
}

//event on click which will triiger GET API
$(document).on("click", ".movieButton", function (event) {
    event.preventDefault();

    $("#gif-div").empty();
    var newMovie = $(this).attr("data-movie");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + newMovie + "&api_key=mogJ09CepTZycWNoNbcvc3ovbaXbg2EX&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            var giphyObj = response.data;
            console.log(giphyObj);
            for (var i = 0; i < giphyObj.length; i++) {

                if (giphyObj[i].rating !== "r") {

                    var newGifDiv = $("<div>");
                    newGifDiv.addClass("gifs");
                    var rating = giphyObj[i].rating;
                    var p = $("<p>").text("Rating: " + rating);

                    var gifImg = $("<img>");
                    gifImg.attr("src", giphyObj[i].images.fixed_height_still.url);
                    gifImg.attr("data-animate", giphyObj[i].images.fixed_height.url);
                    gifImg.attr("data-still", giphyObj[i].images.fixed_height_still.url);
                    gifImg.attr("title", giphyObj[i].title);
                    gifImg.attr("data-state", giphyObj[i].images.fixed_height_still.url);
                    gifImg.addClass("gif");
                    newGifDiv.append(gifImg);
                    newGifDiv.append(p);
                    $("#gif-div").append(newGifDiv);
                }
            }
        });
});

$(document).on("click", ".gif", function () {

    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

$("#movieButton").on("click", function (event) {
    event.preventDefault();
    var movie = $("input").val().trim();
    if (movie.length > 2) {
        movies.push(movie);
    } 
  makeButtons(movies, "movieButton", "#movieButton");

  });

makeButtons(movies, "movieButton", "#movieButton");

 });

