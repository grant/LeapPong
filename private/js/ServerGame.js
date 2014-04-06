/**
 * The server-side game
 */
function Game (server) {
  // Constants
  var SERVER_FRAME_RATE = 30; // fps
  var CLIENT_FRAME_RATE = 30; // fps

  var BALL_SPEED = 5;

  // Fields
  var game = this;

  // Scores
  this.scores = {
    player1: 0,
    player2: 0
  };

  // Ball
  this.ball = {
    x: undefined,
    y: undefined,
    width: 4,
    height: 7,
    vx: 0,
    vy: 1,
    setXY: function (x, y) {
      this.x = x;
      this.y = y;
    },
    reset: function (x, y) {
      this.vx = 0;
      this.vy = 1;
      this.x = 50;
      this.y = 50;
    }
  };

  // Paddles
  var paddleHeight = 7;
  var paddleWidth = 15;
  this.paddles = {
    player1: {
      x: 50,
      y: 0
    },
    player2: {
      x: 50,
      y: 100
    }
  };

  // Methods

  /**
   * The main method to update the game
   */
  this.updateGame = function () {
    var ball = game.ball;
    // Update the ball position
    ball.x += ball.vx;
    ball.y += ball.vy;

    // If the ball is out of the y bounds, update the score
    if (ball.y <= 0) {
      ++game.scores.player2;
      game.reset();
    } else if (ball.y >= 100) {
      ++game.scores.player1;
      game.reset();
    }

    // Bounce the ball off the walls
    if (ball.x < 0) {
      ball.vx *= -1;
      ball.x = 0;
    } else if (ball.x > 100) {
      ball.vx *= -1;
      ball.x = 100;
    }

    // Bounce ball off paddles
    var paddle1 = game.paddles.player1;
    var paddle2 = game.paddles.player2;
    var bouncedOffPaddle = false;
    var bouncedPaddle;

    // Bottom paddle
    if (ball.y + (ball.height / 2) > paddle2.y - (paddleHeight / 2) &&
        ball.x + (ball.width / 2) >= paddle2.x - (paddleWidth / 2) &&
        ball.x - (ball.width / 2) <= paddle2.x + (paddleWidth / 2)) {
      bouncedOffPaddle = true;
      bouncedPaddle = paddle2;
      ball.y = paddle2.y - (ball.height / 2) - (paddleHeight / 2);
    }
    // Top paddle
    if (ball.y - (ball.height / 2) < paddle1.y + (paddleHeight / 2) &&
        ball.x + (ball.width / 2) >= paddle1.x - (paddleWidth / 2) &&
        ball.x - (ball.width / 2) <= paddle1.x + (paddleWidth / 2)) {
      bouncedOffPaddle = true;
      bouncedPaddle = paddle1;
      ball.y = paddle1.y + (game.ball.height / 2) + (paddleHeight / 2);
    }

    if (bouncedOffPaddle) {
      ball.vy *= -1;
      // The offset from the middle of the paddle from (-1 to 1). 0 is the center
      var middleOffset = (ball.x - bouncedPaddle.x) / ((paddleWidth + ball.width) / 2);
      ball.vx = middleOffset;
    }
    // console.log(game.toJSON());
  };

  /**
   * Updates paddle's x coordinate
   * @param {String} Name of the paddle
   * @param {Number} Paddle's new x coordinate
   */
  this.updatePaddleX = function (name, x) {
    this.paddles[name].x = x;
  };

  /**
   * Resets the game
   */
  this.reset = function () {
    this.ball.reset();
  };

  /**
   * Gets a JSON representation of the game state
   * @returns {Object} The game as an object
   */
  this.toJSON = function () {
    return {
      ball: {
        x: this.ball.x,
        y: this.ball.y
      },
      paddles: {
        player1: this.paddles.player1,
        player2: this.paddles.player2
      },
      scores: this.scores
    };
  };

  // Setup
  (function setup() {
    var player1Connected = false;
    var hasTwoPlayers = false;

    // Setup Socket.IO
    var io = require('socket.io').listen(server, { log: false });
    io.sockets.on('connection', function(socket) {
      // Setup players

      // Player 1
      if (!player1Connected) {
        player1Connected = true;
        socket.name = 'player1';
      } else if (!hasTwoPlayers) { // Player 2
        hasTwoPlayers = true;
        socket.name = 'player2';
      }
      socket.emit('set name', socket.name);

      // Receive paddle x
      socket.on('update paddle x', function(x) {
        game.updatePaddleX(socket.name, x);
      });

      // Push game state to clients
      setInterval(function () {
        socket.emit('update game state', game.toJSON());
      }, 1000 / CLIENT_FRAME_RATE);


      // socket.broadcast('update', game.toJSON());
    });

    // Setup game interval
    game.reset();
    setInterval(game.updateGame, 1000 / SERVER_FRAME_RATE);
  })();
}

module.exports = Game;