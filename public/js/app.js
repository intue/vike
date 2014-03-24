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

Vike.VideosView = Ember.View.extend({
    didInsertElement: function () {
        this.$('#horiz_container_outer').horizontalScroll();
    }
});

Ember.Handlebars.helper('format-date', function(date) {
  return moment(date).fromNow();
});