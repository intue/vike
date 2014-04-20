Vike = Ember.Application.create();

initVikeUser.then(function (vikeyr) {
    DS.RESTAdapter.reopen({
        host: 'http://localhost:5800/api/v2',
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

Ember.Handlebars.helper('format-date', function (date) {
    return moment(date).fromNow();
});

var socket = io.connect('http://localhost:5800/');

socket.emit('subscribe', 'abc');
socket.on('event', function (data) {
    console.log('socket.io', data);
});