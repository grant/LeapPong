/**
 * The server-side game
 */
function Game (server) {
  // Constants

  // Fields

  // Ball
  this.ball = {
    x: 0,
    y: 0
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
    });
  })();
}

module.exports = Game;