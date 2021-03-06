var googleapis = require('googleapis');
var when = require('when');

var getGoogleYouTubeClinet = function getGoogleYouTubeClinet() {
    var deferred = when.defer();

    googleapis
        .discover('youtube', 'v3')
        .execute(function (err, client) {
            if (err) {
                console.log('client discovery error : ', err);
                deferred.reject(err);
            } else {
                console.log('client discoverd');
                deferred.resolve(client);
            }
        });

    return deferred.promise;
};

module.exports = getGoogleYouTubeClinet;
