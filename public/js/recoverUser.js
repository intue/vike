initVikeUser = new Ember.RSVP.Promise(function (resolve, reject) {
    var ec = new evercookie({
        silverlight: false,
        history: false,
        authPath: false
    });
    ec.get('VIKEYR', function (value) {
        if (value) {
            resolve(encodeURIComponent(value));
        } else {
            Ember.$.getJSON('/api/v2/user/initialize/', function (data) {
                ec.set('VIKEYR', data);
                resolve(encodeURIComponent(data));
            });          
        }
    });
});