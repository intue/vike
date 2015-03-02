Vike.VideocategoriesRoute = Ember.Route.extend({
    model: function () {
        return this.store.findQuery('videocategory', {
            country_code: Vike.Location.country_code
        });
    }
});