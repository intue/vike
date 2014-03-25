Vike.Router.map(function () {
    this.resource('videos', {
        path: '/'
    }, function () {
        this.resource('player', {
            path: ':videoid'
        });
    });
});