Vike.VideosRoute = Ember.Route.extend({
    model: function () {
        return this.store.findQuery('video', {
            country_code: Vike.Location.country_code
        });
    },
    afterModel: function (videos, transition) {
        this.transitionTo('player', videos.content[0].id);
    }
});


Vike.VideosController = Ember.ArrayController.extend({
    actions: {
        loadmore: function () {}
    }
});