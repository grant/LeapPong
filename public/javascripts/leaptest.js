'use strict'

$(document).ready(function() {
    var leap = new Leap.Controller();
    var socket = io.connect('http://localhost');

    leap.on('connect', function() {
        console.log('device connected');
    });

    leap.on('frame', function(frame) {
        // console.log(frame);
        socket.emit('leap-data', {leapData: frame.fingers});
    });

    leap.connect();
});
