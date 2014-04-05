/**
 * The server-side game
 */
function Game (server) {
  // Constants
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
    x: 0,
    y: 0,
    vx: 0,
    vy: 1,
    setXY: function (x, y) {
      this.x = x;
      this.y = y;
    },
    reset: function (x, y) {
      this.x = 50;
      this.y = 50;
    }
  };

  // Paddles
  this.paddles = {
    player1: undefined,
    player2: undefined
  };

  // Setup
  (function setup() {
    var io = require('socket.io').listen(server);

    io.sockets.on('connection', function(socket) {
        socket.on('leap-data', function(data) {
            console.log(data);
        });

        socket.broadcast('update', game.toJSON());
    });
  })();

  // Methods

  /**
   * The main method to update the game
   */
  this.updateGame = function () {
    // Update the ball position
    this.ball.x += this.ball.vx;
    this.ball.y += this.ball.vy;

    // If the ball is out of bounds, update the score
    if (ball.y < 0) {
      ++this.scores.player2;
      this.reset();
    } else if (ball.y > 100) {
      ++this.scores.player1;
      this.reset();
    }
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
      ball: this.ball,
      paddles: this.paddles
    };
  };
}

module.exports = Game;