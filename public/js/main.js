var FADE_TIME = 200;
var LEAP_RANGE = 200;

$(function() {
  var $popup = $('.popup');
  var $game = $('.game');
  var leap = new Leap.Controller();

  // Setup
  var game = new ClientGame();

  // Popup controls
  $popup.find('button').click(function () {
    var $button = $(this);
    game.setup();

    $popup.fadeOut(FADE_TIME);
  });

  // Keyboard controls
  $(window).keydown(function (e) {
    if (game.hasStarted) {
      var ascii = e.which;
      var left = ascii === 37;
      var right = ascii === 39;

      if (left) {
        game.movePaddle('player', 'left');
      }
      if (right) {
        game.movePaddle('player', 'right');
      }
    }
  });

  // Leap motion controls
  leap.on('frame', function(frame) {
    if (game.hasStarted) {
      var fingers = frame.fingers;
      if (fingers.length) {
        // Average finger x
        var total = 0;
        for (var i in fingers) {
          total = total + fingers[i].tipPosition[0]; // x coordinate
        }
        var x = total / fingers.length;

        // Translates leap motion x to paddle x
        if (x > (-1 * LEAP_RANGE) && x < LEAP_RANGE) {
          x = x + LEAP_RANGE;
          newX = x / (LEAP_RANGE * 2) * 100;
          game.setPaddleX('player', newX);
        }
      }
    }
  });

  leap.connect();
});