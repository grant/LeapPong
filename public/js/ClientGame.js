/**
 * The client-side game
 */
function ClientGame () {
  // Constants

  var PADDLE_MOVE_SPEED = 5;

  // Fields

  this.name = undefined; // The name of this client's connection

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

  /**
   * Moves the paddle relative to the current position
   * @param {String} paddleName The paddle name ('enemy' or 'player')
   * @param {String} direction 'left' or 'right'
   */
  this.movePaddle = function (paddleName, direction) {
    var windowWidth = parseFloat($(window).width());
    var paddle = this.paddles[paddleName];
    var $paddle = paddle.element;

    var x = paddle.x;
    var xRatio = x / windowWidth;
    var newX;
    if (direction === 'left') {
      newX = x - PADDLE_MOVE_SPEED;
    } else {
      newX = x + PADDLE_MOVE_SPEED;
    }
    this.setPaddleX(paddleName, newX);
  };

  /**
   * Pass a paddle name and an x percentage (0 to 100)
   * Ex: setPaddleX('player', 20)
   * @param {String} paddleName The paddle name ('enemy' or 'player')
   * @param {Number} x A number between 0 and 100
   */
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

  /**
   * Gets the paddle's x
   * @returns {Number} The paddle's x
   */
  this.getPaddleX = function () {
    return this.paddles.player.x;
  };

  /*
   * Pass an x percentage (0 to 100) and y percentage (0 to 100)
   * Ex: setBall(75, 50)
   * @param {Object} coordinates An object containing x and y
   * @param {Number} coordinates.x A number between 0 and 100
   * @param {Number} coordinates.y A number between 0 and 100
   */
  this.setBallXY = function (coordinates) {
    var windowWidth = parseFloat($(window).width());
    var windowHeight = parseFloat($(window).height());
    var ballWidth = parseFloat($('.ball').width());
    var ballHeight = parseFloat($('.ball').height());

    var ballPercentWidth = (ballWidth / windowWidth) * 100;
    var ballPercentHeight = (ballHeight / windowHeight) * 100;

    var xRatio = coordinates.x / 100;
    var yRatio = coordinates.y / 100;

    var newX = xRatio * (100 - ballPercentWidth);
    var newY = yRatio * (100 - ballPercentHeight);

    $('.ball').css('left', newX + '%');
    $('.ball').css('top', newY + '%');
  };

  /**
   * Updates the score UI
   */
  this.updateScoresUI = function () {
    var scores = Object.keys(this.scores);
    for (var key in this.scores) {
      $('.' + key + '.score').html(this.scores[key]);
    }
  };

  //
  // Server/Socket.IO
  //

  /**
   * Updates the game from the server
   * @param {Object} gameState The server game state
   */
  this.update = function (gameState) {
    // Update the ball
    var ball = gameState.ball;
    this.setBallXY(ball);

    // Update the paddle
    var enemyName;
    if (this.name === 'player1') {
      enemyName = 'player2';
    } else {
      enemyName = 'player1';
    }
    this.setPaddleX('enemy', gameState.paddles[enemyName].x);

    // Update the score
    this.scores = {
      'player': gameState.scores[this.name],
      'enemy': gameState.scores[enemyName]
    };
    this.updateScoresUI();
  };

  /**
   * Sets a unique name to the player
   * @param {String} name The unique name
   */
  this.setName = function (name) {
    this.name = name;
  };
}