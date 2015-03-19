var socket = io.connect('/');

socket.emit('subscribe', 'abc');

registerEventNotification = function (callback) {
    socket.on('event', function (data) {
        callback(data);
    });
};