Vike.Video = DS.Model.extend({
    title: DS.attr('string'),
    thumbnail: DS.attr('string'),
    publishedAt: DS.attr('string'),
    description: DS.attr('string'),
    viewCount: DS.attr('string'),
    likeCount: DS.attr('string'),
    dislikeCount: DS.attr('string'),
    commentCount: DS.attr('string'),
    seopath: function () {
        return this.get('id');
    }.property('id', 'title'),
    player: function () {
        return 'http://www.youtube.com/embed/' + this.get('id') + '?enablejsapi=1&origin=http://example.com';
    }.property('id')
});