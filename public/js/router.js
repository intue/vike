Vike.Router.map(function () {
    this.resource('videos', {
        path: '/'
    }, function () {
        this.resource('player', {
            path: ':videoid'
        });
    });
    
    this.resource('about', {
        path : '/about'
    });
});