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

    // X is from 0 to 100
    this.paddles.enemy = {
      element: $('.enemy.paddle'),
      x: 50
    };
    this.paddles.player = {
      element: $('.player.paddle'),
      x: 50
    };
  };

  this.movePaddle = function (paddleName, direction) {
    var windowWidth = parseFloat($(window).width());
    var paddle = this.paddles[paddleName];
    var $paddle = paddle.element;

    var x = paddle.x;
    var xRatio = x / windowWidth;
    var newX;
    if (direction === 'left') {
      newX = x - MOVE_SPEED;
    } else {
      newX = x + MOVE_SPEED;
    }
    this.setPaddleX(paddleName, newX);
  };

  this.setPaddleX = function (paddleName, x) {
    var windowWidth = parseFloat($(window).width());
    var paddle = this.paddles[paddleName];
    var $paddle = paddle.element;
    var paddleWidth = parseFloat($paddle.width());
    var paddlePercentWidth = (100 * paddleWidth) / windowWidth;

    var newX = Math.min(100, Math.max(0, x));
    paddle.x = newX;

    var xRatio = newX / 100;
    var leftOffset = xRatio * (100 - paddlePercentWidth);
    $paddle.css('left', leftOffset + '%');
  };
}