Vike.VideocategoriesRoute = Ember.Route.extend({
    model: function () {
        return this.store.findAll('videocategory');
    }
});