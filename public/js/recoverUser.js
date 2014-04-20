initVikeUser = new Ember.RSVP.Promise(function (resolve, reject) {
    document.addEventListener('userrecovered', function (e) {
        resolve();
    }, false);
});

function restoreUserSession(data) {
    if (data) {
        var event = new Event('userrecovered');
        
        if (data === 'known') {
            document.dispatchEvent(event);
        } else {
            var ec = new evercookie({
                silverlight: false,
                history: false,
                authPath: false
            });

            ec.get('VIKEYR', function (value) {
                if (value) {
                    $.get('/api/v2/user/recover/'+ encodeURIComponent(value), function(){
                        document.dispatchEvent(event);
                    });
                } else {
                    document.dispatchEvent(event);
                    ec.set('VIKEYR', data);                    
                }
            });
        }
    }
}