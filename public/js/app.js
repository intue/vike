Vike = Ember.Application.create();

Vike.ApplicationAdapter = DS.RESTAdapter.extend({
    host: 'http://localhost:5800/api/v1'
});

function setLocation(locationData) {
    Vike.Location = {
        city: locationData.city,
        country_code: locationData.country_code,
        country_name: locationData.country_name,
    };
}