$(document).ready(function() {

    // array to store cartoon characters names
    var topics = ["Spongebob Squarepants", "Patrick Star", "Gary the Snail", "Squidward", "Mr. Krabs", "Timmy Turner", "Tommy Pickles", "Chuckie Finster"];

    // call to make the buttons for the predefined topics
    makeButtons();

    // creates a new button when user searches for a new term
    $("#search-button").on("click", function() {
        userInput = $("input").val().trim();
        topics.push(userInput);
        makeButtons();
    });

    // function that creates a button for each element in the topics array
    function makeButtons() {
        $("#button-div").empty();

        for(var i = 0; i < topics.length; i++) {
            var newButton = $("<button>");
            newButton.attr("type", "button");
            newButton.attr("class", "btn btn-info");
            newButton.attr("data-character", topics[i]);
            newButton.text(topics[i]);
            $("#button-div").append(newButton);
        }
    }

    // function to find the gifs based on the button
    $(document).on("click", ".btn-info", function() {

        // calls the Giphy API with the data stored in each of the buttons
        var apiURL = "https://api.giphy.com/v1/gifs/search?q=" + $(this).attr("data-character") + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: apiURL,
            method: "GET"
        }).then(function(response) {
            var gifs = response.data;

            // loops through each of the gifs
            for(var i = 0; i < gifs.length; i++) {

                var wrapperDiv = $("<div>");
                wrapperDiv.addClass("wrapper");
                wrapperDiv.attr("style", "vertical-align: top; margin-top: 10px; margin-right: 15px");

                // creates a div for the gif and its rating
                var characterDiv = $("<div>");
                characterDiv.attr("style", "float: left; ");

                // gets the gif and its relevant data attributes
                var gif = gifs[i];
                var urlAnimated = gif.images.fixed_height.url;
                var urlStill = gif.images.fixed_height_still.url;
                var rating = gif.rating;
                var title = gif.title;
                
                // creates the actual gif image element
                // populates attributes with relevant information
                var characterImage = $("<img>");
                characterImage.attr("src", urlStill);
                characterImage.attr("data-state", "still");
                characterImage.attr("data-still", urlStill);
                characterImage.attr("data-animated", urlAnimated);
                characterImage.attr("style", "border: 1px solid black; border-radius: 3px;");

                var childDiv1 = $("<div>");
                childDiv1.addClass("child");
                var childDiv2 = $("<div>");
                childDiv2.addClass("child");

                // creates the p tag for the gif's title
                var pTitle = $("<div>").text("Title: " + title);

                // creates the p tag for the gif's rating
                var pRating = $("<div>").text("Rating: " + rating);

                childDiv1.append(pTitle);
                childDiv2.append(pRating);

                // appends the gif and p to the div, prepends that the entire gif div
                characterDiv.append(characterImage);
                characterDiv.append(childDiv1);
                characterDiv.append(childDiv2);
                wrapperDiv.append(characterDiv);
                $("#gifs").prepend(wrapperDiv);
            }
        });
    });

    // function to animate/freeze gifs when clicked based on state
    $(document).on("click", "img", function() {
        var gifState = $(this).attr("data-state");
        if(gifState == "still") {
            var animated = $(this).attr("data-animated");
            $(this).attr("src", animated)
            $(this).attr("data-state", "animated");
        }
        else {
            var still = $(this).attr("data-still");
            $(this).attr("src", still)
            $(this).attr("data-state", "still");
        }
    });

    
});