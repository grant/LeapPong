/**
 * The client-side game
 */
function Game () {
  // Constants

  var MOVE_SPEED = 3;

  // Fields

  // Scores
  this.scores = {
    enemy: 0,
    player: 0
  };

  // Paddles
  this.paddles = {
    enemy: undefined,
    player: undefined
  };

  this.hasStarted = false;

  // Methods

  this.setup = function () {
    this.hasStarted = true;

    this.paddles.enemy = {
      element: $('.enemy.paddle')
    };
    this.paddles.player = {
      element: $('.player.paddle')
    };
  };

  this.movePaddle = function (paddleName, direction) {
    var windowWidth = parseFloat($(window).width());

    var $paddle = this.paddles[paddleName].element;
    var paddleWidth = parseFloat($paddle.width());
    var paddlePercentWidth = (100 * paddleWidth) / windowWidth;

    var x = parseFloat($paddle.css('left'));
    var xRatio = x / windowWidth;
    var percentX = 100 * xRatio;
    var newPercentX;
    if (direction === 'left') {
      newPercentX = percentX - MOVE_SPEED;
    } else {
      newPercentX = percentX + MOVE_SPEED;
    }
    newPercentX = Math.min(100 - paddlePercentWidth, Math.max(0, newPercentX));
    $paddle.css('left', newPercentX + '%');
  };
}