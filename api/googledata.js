var when = require('when');
var getGoogleYouTubeClinet = require('./getYouTubeClient.js')();

var API_KEY = 'AIzaSyCT8CYXZFfpPtVWja4bNw2CiCewdhzDiLY';



var getCategoryList = function getCategoryList(client, countryCode) {
    var deferred = when.defer();
    var params = {
        part: 'snippet',
        regionCode: countryCode,
        hl: 'en_US'
    };
    var req1 = client.youtube.videoCategories.list(params).withApiKey(API_KEY);
    req1.execute(function (err, response) {
        if (err) {
            console.log('response error-------------:', err);
            deferred.reject(err);
        } else {
            console.log('response resolved');
            deferred.resolve(response);
        }
    });
    return deferred.promise;
};

var getVideoList = function getVideoList(category, countryCode, client) {
    var deferred = when.defer();
    var params = {
        part: 'snippet,statistics',
        regionCode: countryCode,
        chart: "mostPopular",
        maxResults: 20,
        videoCategoryId: category.toString()
    };
    var req1 = client.youtube.videos.list(params).withApiKey(API_KEY);
    req1.execute(function (err, response) {
        if (err) {
            console.log('response error--------------:', err);
            deferred.reject(err);
        } else {
            console.log('response resolved-----');
            deferred.resolve(response);
        }
    });
    return deferred.promise;
};

var getSingleVideo = function getVideoList(videoId, client) {
    var deferred = when.defer();
    var params = {
        part: 'snippet,statistics',
        id: videoId
    };
    var req1 = client.youtube.videos.list(params).withApiKey(API_KEY);
    req1.execute(function (err, response) {
        if (err) {
            console.log('response error--------------:', err);
            deferred.reject(err);
        } else {
            console.log('response resolved-----');
            deferred.resolve(response);
        }
    });
    return deferred.promise;
};

var getRelatedVideoList = function getRelatedVideoList(videoId, client) {
    var deferred = when.defer();
    var params = {
        part: 'snippet',
        type: 'video',
        relatedToVideoId: videoId
    };
    var req1 = client.youtube.search.list(params).withApiKey(API_KEY);
    req1.execute(function (err, response) {
        if (err) {
            console.log('response error--------------:', err);
            deferred.reject(err);
        } else {
            console.log('response resolved-----');
            deferred.resolve(response);
        }
    });
    return deferred.promise;
};

var getVideos = function getVideos(category, countryCode, ondata) {
    getGoogleYouTubeClinet.then(function (client) {
        return getVideoList(category, countryCode, client);
    }).then(function (data) {
        var result = {
            video: []
        };
        //        console.log('got video data');
        data.items.forEach(function (item) {
            result.video.push({
                id: item.id,
                title: item.snippet.title,
                thumbnail: item.snippet.thumbnails.medium.url,
                publishedAt: item.snippet.publishedAt,
                description: item.snippet.description,
                viewCount: item.statistics.viewCount,
                likeCount: item.statistics.likeCount,
                dislikeCount: item.statistics.dislikeCount,
                commentCount: item.statistics.commentCount
            });
        });

        ondata(JSON.stringify(result));
    });
};

var getVideo = function getVideos(videoId, ondata) {
    getGoogleYouTubeClinet.then(function (client) {
        return getSingleVideo(videoId, client);
    }).then(function (data) {
        var result = {};
        var item = data.items[0];
        result.video = {
            id: item.id,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.medium.url,
            publishedAt: item.snippet.publishedAt,
            description: item.snippet.description,
            viewCount: item.statistics.viewCount,
            likeCount: item.statistics.likeCount,
            dislikeCount: item.statistics.dislikeCount,
            commentCount: item.statistics.commentCount
        };


        ondata(JSON.stringify(result));
    });
};

var getRelatedVideos = function getVideos(videoId, ondata) {
    getGoogleYouTubeClinet.then(function (client) {
        return getRelatedVideoList(videoId, client);
    }).then(function (data) {
        var result = {
            relatedVideos: []
        };
        //        console.log('got video data');
        data.items.forEach(function (item) {
            result.relatedVideos.push({
                id: item.id.videoId,
                title: item.snippet.title,
                thumbnail: item.snippet.thumbnails.medium.url
            });
        });
        console.log(result);
        ondata(JSON.stringify(result));
    });
};

var getThings = function (countryCode, ondata) {
    getGoogleYouTubeClinet.then(function (client) {
        return getCategoryList(client, countryCode);
    }).then(function (data) {
        var result = {
            videocategory: []
        };
        console.log('got data');
        data.items.forEach(function (item) {
            result.videocategory.push({
                id: item.id,
                title: item.snippet.title
            });
        });
        ondata(JSON.stringify(result));
    }, function (error) {

    });
};

module.exports = function (app) {
    app.get('/api/v2/videocategories', function (req, res) {
        var countryCode = req.query.country_code || 'US';
        getThings(countryCode, function (data) {
            res.send(data);
        });
    });

    app.get('/api/v2/videos', function (req, res) {
        var category = req.query.category || 1;
        var countryCode = req.query.country_code || 'US';
        var ondata = function (data) {
            res.send(data);
        };
        getVideos(category, countryCode, ondata);
    });

    app.get('/api/v2/videos/:videoId', function (req, res) {
        var videoId = req.params.videoId;
        var ondata = function (data) {
            res.send(data);
        };
        getVideo(videoId, ondata);
    });

    app.get('/api/v2/:videoId/related', function (req, res) {
        var videoId = req.params.videoId;
        var ondata = function (data) {
            res.send(data);
        };
        getRelatedVideos(videoId, ondata);
    });
};