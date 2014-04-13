Vike.VideosRoute = Ember.Route.extend({
    model: function () {
        return this.store.findQuery('video', {
            country_code: Vike.Location.country_code
        });
    }
});

Vike.VideosController = Ember.ArrayController.extend({
    isHomeMode : true,
    actions: {
        loadmore: function () {}
    }
});