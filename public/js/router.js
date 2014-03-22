Vike.Router.map(function () {
    this.resource('videocategories', {
        path: '/'
    }, function () {
        this.resource('videos', {
            path: ':category'
        }, function () {
            this.resource('player', {
                path: ':videoid'
            });
        });
    });
});