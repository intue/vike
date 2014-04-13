Vike = Ember.Application.create();

Vike.ApplicationAdapter = DS.RESTAdapter.extend({
    host: 'http://localhost:5800/api/v2',
    headers: {
        "API_KEY": "secret key",
        "COUNTRY_CODE": "CN"
    }
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
        this.$( "#brand" ).click(function() {
            that.get('controller').controllerFor('videos').set('isHomeMode', true);
        });        
    }
});

Ember.Handlebars.helper('format-date', function(date) {
  return moment(date).fromNow();
});