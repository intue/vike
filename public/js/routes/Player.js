Vike.PlayerRoute = Ember.Route.extend({
    model: function (params) {
        return this.store.find('video', params.videoid);
    },
    setupController: function (controller, model) {
        controller.set('model', model);
        Ember.$.getJSON('/api/v2/'+ model.id+'/related').then(function (data) {
            controller.set('relatedVideos', data.relatedVideos);
        });
    }
});