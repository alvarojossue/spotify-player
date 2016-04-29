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

	$(".js-artist").on("click", function(){
		console.log("THE MODAL PLEASE")
		var artistName = $(".js-artist").val();
		console.log(artistName)

		$.ajax({
			url: "https://api.spotify.com/v1/search?type=artist&query=" + artistName,
			success: function(theData){
				console.log("Retrieving data about the artist")
				console.log(theData);
				showInfoinModal(theData.artists.items);




				$('.js-modal').modal("show");
			},
			error: function(theError){
				console.log("Failed retrieving data about the artist")
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

//------- function to display artist name ------//

function displayArtist(the_items){
	var html = `${the_items[0].artists[0].name}`
	$(".js-artist").text(html);
	$(".js-artist").val(html);
}

//------- function to display cover picture ------//

function displayCover(the_items){
	var html = `<img src="${the_items[0].album.images[0].url}">`
	$(".js-cover").empty();
	$(".js-cover").append(html);
}

//--------- function to get audio source -------//

function getAudio(the_items){
	var html = `<audio class= "js-play-audio" src="${the_items[0].preview_url}"></audio>`
	$(".js-audio").empty();
	$(".js-audio").append(html);
}

//------- function to play/pause audio ------//

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

//------- function to update progress bar ------//

function printTime () {
  var current = $('.js-play-audio').prop('currentTime');
  console.debug('Current time: ' + current);
  var html = `<progress value="${current}" max="30"></progress>`

  $('.seekbar').empty();
  $('.seekbar').append(html);
}

// ------- function to show the artist's info in modal---//

function showInfoinModal(the_array){

	$(".js-modal-name").empty();
	$(".js-modal-followers").empty();
	$(".js-modal-popularity").empty();
	$(".js-modal-genres").empty();
	$(".js-image").empty();


	$(".js-modal-name").text(the_array[0].name);
	$(".js-modal-followers").text(the_array[0].followers.total)
	$(".js-modal-popularity").text(the_array[0].popularity);

	var the_genres = the_array[0].genres

	the_genres.forEach(function(the_genre){
		var html = `
			<li>
				<p>${the_genre}</p>
			</li>`
		$(".js-modal-genres").append(html);
	})

	var the_image = `<img src="${the_array[0].images[0].url}" width="350px">`

	$(".js-image").append(the_image);
}

