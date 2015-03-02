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
            console.log('category list response error : ', err);
            deferred.reject(err);
        } else {
            console.log('got category list response');
            deferred.resolve(response);
        }
    });
    return deferred.promise;
};

var getVideoList = function getVideoList(client, countryCode, page, videoCategory) {
    var deferred = when.defer();
    var params = {
        part: 'snippet,statistics',
        regionCode: countryCode,
        chart: "mostPopular",
        maxResults: 12
    };

    if (page) {
        params.pageToken = page;
    }

    if (videoCategory) {
        params.videoCategoryId = videoCategory;
    }

    var req1 = client.youtube.videos.list(params).withApiKey(API_KEY);
    req1.execute(function (err, response) {
        if (err) {
            console.log('video list response error : ', err);
            deferred.reject(err);
        } else {
            console.log('got video list response');
            deferred.resolve(response);
        }
    });
    return deferred.promise;
};

var getSingleVideo = function getSingleVideo(videoId, client) {
    var deferred = when.defer();
    var params = {
        part: 'snippet,statistics',
        id: videoId
    };
    var req1 = client.youtube.videos.list(params).withApiKey(API_KEY);
    req1.execute(function (err, response) {
        if (err) {
            console.log('video response error : ', err);
            deferred.reject(err);
        } else {
            console.log('got video response');
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
        order: 'rating',
        relatedToVideoId: videoId
    };
    var req1 = client.youtube.search.list(params).withApiKey(API_KEY);
    req1.execute(function (err, response) {
        if (err) {
            console.log('related videos response error : ', err);
            deferred.reject(err);
        } else {
            console.log('got related videos response');
            deferred.resolve(response);
        }
    });
    return deferred.promise;
};

var getVideos = function getVideos(countryCode, videoCategory, page, ondata) {
    getGoogleYouTubeClinet.then(function (client) {
        return getVideoList(client, countryCode, page, videoCategory);
    }).then(function (data) {
        var result = {
            video: [],
            videoPaging: [{
                id: 1,
                nextPageToken: data.nextPageToken
            }]
        };
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

var getRelatedVideos = function getRelatedVideos(videoId, ondata) {
    getGoogleYouTubeClinet.then(function (client) {
        return getRelatedVideoList(videoId, client);
    }).then(function (data) {
        var result = {
            relatedVideos: []
        };
        data.items.forEach(function (item) {
            result.relatedVideos.push({
                id: item.id.videoId,
                title: item.snippet.title,
                thumbnail: item.snippet.thumbnails.
                default.url
            });
        });
        ondata(JSON.stringify(result));
    });
};

//var getThings = function (countryCode, ondata) {
//    getGoogleYouTubeClinet.then(function (client) {
//        return getCategoryList(client, countryCode);
//    }).then(function (data) {
//        var result = {
//            videocategory: []
//        };
//        
//        data.items.forEach(function (item) {
//            result.videocategory.push({
//                id: item.id,
//                title: item.snippet.title
//            });
//        });
//        ondata(JSON.stringify(result));
//    }, function (error) {
//
//    });
//};

module.exports = function (app) {
    //    app.get('/api/v2/videocategories', function (req, res) {
    //        var countryCode = req.query.country_code || 'US';
    //        getThings(countryCode, function (data) {
    //            res.send(data);
    //        });
    //    });

    app.get('/api/v2/videos', function (req, res) {
        var countryCode = req.query.country_code || 'US';
        var videoCategory = req.query.videoCategory;
        var page = req.query.pageToken;
        var ondata = function (data) {
            res.send(data);
        };
        getVideos(countryCode, videoCategory, page, ondata);
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