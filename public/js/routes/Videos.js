Vike.VideosRoute = Ember.Route.extend({
    model: function () {
        var that = this;
        return initVikeUser.then(function(){ return that.store.findQuery('video', {
            country_code: Vike.Location.country_code
        })});
    }
});

Vike.VideosController = Ember.ArrayController.extend({
    isHomeMode : true,
    actions: {
        loadmore: function () {}
    }
});