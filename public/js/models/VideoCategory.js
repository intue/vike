Vike.Videocategory = DS.Model.extend({
    title: DS.attr('string'),
    seopath: function(){
        return this.get('id');
    }.property('id', 'title')
});