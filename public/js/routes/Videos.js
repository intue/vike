Vike.VideosRoute = Ember.Route.extend({
    model: function (params) {
        return this.store.find('video', {
            category: params.category.split('_')[0]
        });
    }
});