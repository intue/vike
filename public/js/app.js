Vike = Ember.Application.create();

initVikeUser.then(function (vikeyr) {
    DS.RESTAdapter.reopen({
        host: '/api/v2',
        headers: {
            'VIKEYR': vikeyr
        }
    });

    Ember.$.ajaxSetup({
        headers: {
            'VIKEYR': vikeyr
        }
    });
});

function setLocation(locationData) {
    Vike.Location = {
        city: locationData.city,
        country_code: locationData.country_code,
        country_name: locationData.country_name,
    };
}

Vike.ApplicationView = Ember.View.extend({
    didInsertElement: function () {
        var that = this;
        this.$("#brand").click(function () {
            that.get('controller').controllerFor('videos').set('isHomeMode', true);
        });
    }
});

Vike.NavbarController = Ember.ObjectController.extend({
    notificationCount: 0
});

Vike.NavbarView = Ember.View.extend({
    didInsertElement: function () {
        var that = this;
        registerEventNotification(function () {
            var value = parseInt(that.get('controller').get('notificationCount'));
            that.get('controller').set('notificationCount', value + 1);
        });
    }
});

Ember.Handlebars.helper('format-date', function (date) {
    return moment(date).fromNow();
});