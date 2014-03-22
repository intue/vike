Vike.VideosRoute = Ember.Route.extend({
    model: function (params) {
        return this.store.findQuery('video', {
            category: params.category.split('_')[0],
            country_code: Vike.Location.country_code,
            limit: 10,
            offset: 0
        });
    }
});


Vike.VideosController = Ember.ArrayController.extend({
    actions: {
        loadmore: function () {
        }
    }
});