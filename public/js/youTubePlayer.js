YouTube_PlayerState = {};
YouTube_PlayerState.UNSTARTED = -1;
YouTube_PlayerState.ENDED = 0;
YouTube_PlayerState.PLAYING = 1;
YouTube_PlayerState.PAUSED = 2;
YouTube_PlayerState.BUFFERING = 3;
YouTube_PlayerState.CUED = 5;

function onPlayerStateChange(event) {
    var player = document.getElementById("ytPlayer");
    var videoId = player.getVideoUrl().match(/[?&]v=([^&]+)/)[1];
    if (event == YouTube_PlayerState.PLAYING && player.getCurrentTime() === 0) {
        Ember.$.post('/api/v2/userbehaviour', {
            videoId : videoId,
            playerState : YouTube_PlayerState.PLAYING,
            timeStamp : Date.now()
        });
    }

    if (event == YouTube_PlayerState.ENDED) {
        Ember.$.post('/api/v2/userbehaviour', {
            videoId : videoId,
            playerState : YouTube_PlayerState.ENDED,
            timeStamp : Date.now()
        });
    }
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
        setTimeout(function () {
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
    swfobject.embedSWF("https://www.youtube.com/v/" + videoId +
        "?version=3&enablejsapi=1&playerapiid=player1",
        "ytapiplayer", "480", "295", "9", null, null, params, atts);
}