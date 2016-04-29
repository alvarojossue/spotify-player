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
				displayTitle(theData.tracks.items[0])
			},
			error: function(theError){
				console.log("It failed");
				console.log(theError.responseJSON);
			}

		})

	})
});

function displayTitle(the_track){
	var html = `${the_track.name}`
	$(".js-title").text(html);
}