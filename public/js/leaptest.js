$(document).ready(function() {
  var leap = new Leap.Controller();
  var socket = io.connect();

  leap.on('connect', function() {
    console.log('device connected');
  });

  leap.on('frame', function(frame) {
    var fingers = frame.fingers;
    if (fingers.length) {
      var position = fingers[0].tipPosition;
      var x = position[0];
      console.log(x);
    }
    // socket.emit('leap-data', {leapData: frame.fingers});
  });

  leap.connect();
});