/* ------------------App-------------------------------*/

window.Vike = Ember.Application.create();

Vike.Store = DS.Store.extend({
    adapter: DS.FixtureAdapter
});


/* -----------------Router-------------------------*/

Vike.Router.map(function () {
    this.resource('videos', function () {
        this.resource('belt', {
            path: ':belt_type'
        }, function () {
            this.resource('video', {
                path: ':video_id'
            });
        });
    });
});


/* -------------------Routes------------------------- */

Vike.IndexRoute = Ember.Route.extend({
  beforeModel: function() {
    this.transitionTo('videos');
  }
});

Vike.VideosRoute = Ember.Route.extend({
    model: function () {
        return this.store.find('videos');
    },
	afterModel: function(videos, transition) {
	  console.log(videos.content);
      this.transitionTo('belt', 'popular');
  }
});

Vike.BeltRoute = Ember.Route.extend({
    model: function (params) {
        return this.store.find('belt');
    },
	afterModel: function(belt, transition) {
		this.transitionTo('video', '3T2Zl0I9VWM');
	}
});

Vike.VideoRoute = Ember.Route.extend({
    model: function (params) {
        return this.store.find('video', params.video_id);
    }
});

Vike.VideosController = Ember.ArrayController.extend({
    belt: null,
    actions: {
        select: function (id) {
            this.set('belt', id);
        }
    }
});

Vike.BeltController = Ember.ArrayController.extend({
    video: null,
    actions: {
        select: function (id) {
            console.log(id);
            this.set('video', id);
        }
    }
});

/*----------------------Models---------------------------------*/

Vike.Videos = DS.Model.extend({
    belttype: DS.attr('string')
});

Vike.Belt = DS.Model.extend({
    title: DS.attr('string'),
    thumbnail: DS.attr('string')
});

Vike.Video = DS.Model.extend({
    title: DS.attr('string'),
    thumbnail: DS.attr('string'),
    player: function () {
        return 'http://www.youtube.com/embed/' + this.get('id') + '?enablejsapi=1&origin=http://example.com';
    }.property('id')
});

/*-------------------FIXTURES--------------------------*/

Vike.Video.FIXTURES = [{
        id: '3T2Zl0I9VWM',
        title: 'Top 10 Infamous Celebrity Sex Scandals',
        thumbnail: 'https://i.ytimg.com/vi/3T2Zl0I9VWM/mqdefault.jpg'
 },
    {
        id: '5LyxZ5OTLII',
        title: 'Top 10 Movie Milfs',
        thumbnail: 'https://i.ytimg.com/vi/5LyxZ5OTLII/mqdefault.jpg'
 },
    {
        id: 'GznfU13NMjA',
        title: 'SUNIL EDIRISINGHA',
        thumbnail: 'https://i.ytimg.com/vi/GznfU13NMjA/mqdefault.jpg'
 }];

Vike.Belt.FIXTURES = [
    {
        id: '3T2Zl0I9VWM',
        title: 'Top 10 Infamous Celebrity Sex Scandals',
        thumbnail: 'https://i.ytimg.com/vi/3T2Zl0I9VWM/mqdefault.jpg'
 },
    {
        id: '5LyxZ5OTLII',
        title: 'Top 10 Movie Milfs',
        thumbnail: 'https://i.ytimg.com/vi/5LyxZ5OTLII/mqdefault.jpg'
 },
    {
        id: 'GznfU13NMjA',
        title: 'SUNIL EDIRISINGHA',
        thumbnail: 'https://i.ytimg.com/vi/GznfU13NMjA/mqdefault.jpg'
 }
];

Vike.Videos.FIXTURES = [
    {
        id: 4,
        belttype: 'recommended'
        },
    {
        id: 8,
        belttype: 'popular'
        },
		{
        id: 18,
        belttype: 'music'
        }
];