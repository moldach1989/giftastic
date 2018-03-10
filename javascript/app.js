$(function() {
    renderButtons(topics, 'musicButton', '#musicButtons');
});

var topics = ["the beatles", "the red hot chilli peppers", "the rolling stones", "the fugees", "eminem", "kid cudi", "shakira", "childish gambino", "chance the rapper"];

function renderButtons(topics, musicButton, musicButtons){   
    $(musicButtons).empty();

    for (var i = 0; i < topics.length; i++){
        
        var a = $('<button>');
        a.addClass(musicButton);
        a.attr('data-name', topics[i]);
        a.text(topics[i]);
        $(musicButtons).append(a);
    }
}

$(document).on('click', '.musicButton', function(){
    $('#music').empty();
    $('.musicButton').removeClass('active');
    $(this).addClass('active');

    var name = $(this).data('name');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({url: queryURL, method: 'GET'})
     .done(function(response) {
        
         var results = response.data;

         for(var i=0; i < results.length; i++){
             var musicDiv = $('<div class="music-item">')

             var rating = results[i].rating;

             var p = $('<p>').text( "Rating: " + rating);

             var animated = results[i].images.fixed_height.url;
             var still = results[i].images.fixed_height_still.url;

             var musicImage = $('<img>');
             musicImage.attr('src', still);
             musicImage.attr('data-still', still);
             musicImage.attr('data-animate', animated);
             musicImage.attr('data-state', 'still')
             musicImage.addClass('musicImage');

             musicDiv.append(p)
             musicDiv.append(musicImage)

             $('#music').append(musicDiv);
         }
    }); 
});

$(document).on('click', '.musicImage', function() {
    var state = $(this).attr('data-state'); 
    
    if ( state === 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
})

$('#addmusic').on('click', function(){
    var newmusic = $('input').eq(0).val();

    if (newmusic.length > 2){
        topics.push(newmusic);
    }

    renderButtons(topics, 'musicButton', '#musicButtons');

    return false;
});