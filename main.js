$(document).on("ready", function(){
	$(".js-submit").on("submit", function(event){
		event.preventDefault();

		var theTrack = $("#track-name").val();
		console.log(theTrack)

		$.ajax({
			url: "https://api.spotify.com/v1/search?type=track&query=" + theTrack,
			success: function(theData){
				console.log("It worked");
				console.log(theData)
				displayTitle(theData.tracks.items)
				displayArtist(theData.tracks.items)
				displayCover(theData.tracks.items)
			},
			error: function(theError){
				console.log("It failed");
				console.log(theError.responseJSON);
			}

		})

	})

	$(".js-play").on("click", function(){

		var theTrack = $("#track-name").val();

		$.ajax({
			url: "https://api.spotify.com/v1/search?type=track&query=" + theTrack,
			success: function(theData){
				console.log("It worked");
				console.log(theData);
				playTrack(theData.tracks.items)
			},
			error: function(theError){
				console.log("It failed");
				console.log(theError.responseJSON);
			}
		})
	})

});

//------- function to display track title ------//

function displayTitle(the_items){
	var html = `${the_items[0].name}`
	$(".js-title").text(html);
	// $("#track-name").val("");
}

function displayArtist(the_items){
	var html = `${the_items[0].artists[0].name}`
	$(".js-artist").text(html);
}

function displayCover(the_items){
	var html = `<img src="${the_items[0].album.images[0].url}">`
	$(".js-cover").empty();
	$(".js-cover").append(html);
}

//--------- function to play track -------//

function playTrack(the_items){
	var html = `<audio class= "js-play-audio" src="${the_items[0].preview_url}"></audio>`
	$(".js-audio").empty();
	$(".js-audio").append(html);
	$('.js-play-audio').trigger('play');
}
