Vike.PlayerRoute = Ember.Route.extend({
    model: function (params) {
        return this.store.find('video', params.videoid.split('_')[0]);
    }
});