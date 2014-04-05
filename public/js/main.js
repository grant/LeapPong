var FADE_TIME = 200;

$(function() {
  var $popup = $('.popup');
  var $game = $('.game');

  // Setup
  var game = new Game();

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
});