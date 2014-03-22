Vike = Ember.Application.create();

Vike.ApplicationAdapter = DS.RESTAdapter.extend({
    host: 'http://localhost:5800/api/v1'
});