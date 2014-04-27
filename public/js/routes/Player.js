Vike.PlayerRoute = Ember.Route.extend({
    model: function (params) {
        var that = this;
        return initVikeUser.then(function(){
            return that.store.find('video', params.videoid);
        });
    },
    setupController: function (controller, model) {
        loadVideo(model.id);
        this.controllerFor('videos').set('isHomeMode', false);
        controller.set('model', model);
        Ember.$.getJSON('/api/v2/' + model.id + '/related').then(function (data) {
            controller.set('relatedVideos', data.relatedVideos);
        });
    }
});