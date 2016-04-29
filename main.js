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
				getAudio(theData.tracks.items)
			},
			error: function(theError){
				console.log("It failed");
				console.log(theError.responseJSON);
			}
		})
	})

	$(".js-play").on("click", function(){
		playPauseTrack();
		$('.js-play-audio').on('timeupdate', printTime);
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

function getAudio(the_items){
	var html = `<audio class= "js-play-audio" src="${the_items[0].preview_url}"></audio>`
	$(".js-audio").empty();
	$(".js-audio").append(html);
}

function playPauseTrack(the_items){
	if ($(".js-play").hasClass('playing') === false){
		$('.js-play-audio').trigger('play');
		$('.js-play').removeClass('disabled');
		$('.js-play').addClass('playing');
	} else {
		$('.js-play-audio').trigger('pause');
		$('.js-play').removeClass('playing');
		$('.js-play').addClass('disabled');
	}
}

function printTime () {
  var current = $('.js-play-audio').prop('currentTime');
  console.debug('Current time: ' + current);
  var html = `<progress value="${current}" max="30"></progress>`

  $('.seekbar').empty();
  $('.seekbar').append(html);
}

