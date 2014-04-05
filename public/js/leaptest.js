$(document).ready(function() {
  var leap = new Leap.Controller();
  var socket = io.connect('http://localhost');

  leap.on('connect', function() {
    console.log('device connected');
  });

  leap.on('frame', function(frame) {
    var fingers = frame.fingers;
    if (fingers.length) {
      var position = fingers[0].tipPosition;
      var x = position[0];
    }
    // socket.emit('leap-data', {leapData: frame.fingers});
  });

  leap.connect();
});