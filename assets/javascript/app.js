var cast = ["Kristin Wiig", "Bill Hader", "Molly Shannon", "Maya Rudolph", "Tina Fey", "Kate McKinnon", "Gilda Radner", "Bill Murray", "Jimmy Fallon", "Amy Poehler"];
			

function renderButtons(){
	$("#magicButtons").empty();
	for (i=0; i < cast.length; i++){
		var btn = $("<button>");
		btn.addClass('cast');
		btn.addClass('btn btn-primary btn-large');
		btn.attr('data-name', cast[i]);
		btn.text(cast[i]);
		$("#magicButtons").append(btn);
		console.log("render: " + cast[i]);
	}
};


renderButtons();



$(document).on("click", ".cast", function() {

	console.log("you clicked a person");

	var name = $(this).attr("data-name");

	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
        	var results = response.data;
          	console.log(response);

          
          	for (var i = 0; i < results.length; i++) {
            //for each response create a div element	
            	var gifDiv = $("<div class='col-md-6'>");
            //Variable to hold the rating of each response object
            	var rating = results[i].rating;
            //Variable to hold the still image
            	var still = results[i].images.fixed_height_still.url;
            //Variable to hold the animation
            	var animate = results[i].images.fixed_height.url;
            

            //creating a paragraph element and assigning it the text of the rating of the response object
            	var p = $("<p>").text("Rating: " + rating);
            //Creating an image element and assigning it the source attribute of the URL of the still.
            	var personImage = $("<img>").addClass("gif");
            	personImage.attr("data-state", still);
            	personImage.attr("data-still", still);
				personImage.attr("data-animate", animate);
            //taking the gifDiv created on line 41 and putting the most recent response image and rating info.
            	gifDiv.prepend(p);
            	gifDiv.prepend(personImage.attr("src", still));
            //putting that gifDiv mentioned above in the div with the id magics from the HTML.
            $("#magics").prepend(gifDiv);
            }

           
        

        $(".gif").on('click', function(){
        
        var state = $(this).attr("data-state");

        if(state === "still"){
        	$(this).attr("src", $(this).attr("data-animate"));
        	$(this).attr("data-state", "animate");

      	}else{
        	$(this).attr("src", $(this).attr("data-still"));
        	$(this).attr("data-state", "still");
    		};	
		})//end of gif click function
    });  //end of done function
});  //end of click event

$("#addCast").on("click", function(){
	var newCast = $('#cast-input').val().trim();
	cast.push(newCast);
	renderButtons();
	// console.log(cast);
	return false;
	}); 	 

      