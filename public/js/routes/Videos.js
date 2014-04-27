Vike.VideosRoute = Ember.Route.extend({
    model: function () {
        var that = this;
        return initVikeUser.then(function () {
            return that.store.filter('video', {
                country_code: Vike.Location.country_code,
                videoCategory: 10
            }, function (video) {
                return true;
            });
        });
    },
    actions: {
        getMore: function () {
            var that = this;
            var controller = this.get('controller'),
                perPage = controller.get('perPage'),
                items;
             this.store.find('videoPaging', 1).then(function(pageInfo){
                 items = that.send('fetchPage', pageInfo.get('nextPageToken'), perPage);
             });
            
        },

        // returns the array of fetched items
        fetchPage: function (page, perPage) {
            console.log('page request', page);
            var that = this;
            Ember.$.getJSON('/api/v2/videos?country_code=' + Vike.Location.country_code + '&videoCategory=' + 10 + '&maxResults=' + 12 + '&pageToken=' + page).then(function (data) {
               that.store.pushPayload('video', data);
                that.get('controller').set('loadingMore', false);
            });    
        }
    }
});

Vike.VideosController = Ember.ArrayController.extend(InfiniteScroll.ControllerMixin, {
    perPage: 50,
    isHomeMode: true,
    actions: {
        loadmore: function () {}
    }
});

Vike.VideosView = Ember.View.extend(
    InfiniteScroll.ViewMixin, {
        didInsertElement: function () {
            //this.setupInfiniteScrollListener();
        },
        willDestroyElement: function () {
            //this.teardownInfiniteScrollListener();
        }
    }
);