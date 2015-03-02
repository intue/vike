var socket = io.connect('http://localhost:5800/');

socket.emit('subscribe', 'abc');

registerEventNotification = function (callback) {
    socket.on('event', function (data) {
        callback(data);
    });
};