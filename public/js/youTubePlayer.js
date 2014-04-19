function onPlayerStateChange(event) {
    Ember.$.post('/api/v2/userbehaviour', {});
}

function onPlayerError(errorCode) {
    console.log("An error occured of type:" + errorCode);
}

function onYouTubePlayerReady(playerId) {
    var player = document.getElementById("ytPlayer");
    player.addEventListener("onError", "onPlayerError");
    player.addEventListener("onStateChange", "onPlayerStateChange");
}

function loadVideo(videoId) {
    var player = document.getElementById("ytPlayer");
    if (player) {
        player.loadVideoById(videoId);
    } else {
        setTimeout(function(){
            loadPlayer(videoId);
        }, 1);        
    }
}

function loadPlayer(videoId) {
    // Lets Flash from another domain call JavaScript
    var params = {
        allowScriptAccess: "always",
        allowfullscreen: true
    };
    // The element id of the Flash embed
    var atts = {
        id: "ytPlayer"
    };
    // All of the magic handled by SWFObject (http://code.google.com/p/swfobject/)
    swfobject.embedSWF("http://www.youtube.com/v/" + videoId +
        "?version=3&enablejsapi=1&playerapiid=player1",
        "ytapiplayer", "480", "295", "9", null, null, params, atts);
}