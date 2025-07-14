import { Chessground } from './chessground.min.js';
import { Chess } from './chess.js';

const game = new Chess();
window.game = game;

const boardElement = document.getElementById('chessboard');

if (boardElement) {
  const ground = Chessground(boardElement, {
    turnColor: 'white',
    orientation: 'white',
    draggable: {
      enabled: true,
      showGhost: true
    },
    highlight: {
      lastMove: true,
      check: true
    },
    animation: {
      enabled: true
    },
    movable: {
      free: false,
      color: 'white',
      dests: computeDests(),
      events: {
        after: move => {
          game.move({ from: move.from, to: move.to, promotion: 'q' });
          updateBoard();
        }
      }
    }
  });

  function computeDests() {
    const dests = new Map();
    const squares = [
      'a8','b8','c8','d8','e8','f8','g8','h8',
      'a7','b7','c7','d7','e7','f7','g7','h7',
      'a6','b6','c6','d6','e6','f6','g6','h6',
      'a5','b5','c5','d5','e5','f5','g5','h5',
      'a4','b4','c4','d4','e4','f4','g4','h4',
      'a3','b3','c3','d3','e3','f3','g3','h3',
      'a2','b2','c2','d2','e2','f2','g2','h2',
      'a1','b1','c1','d1','e1','f1','g1','h1'
    ];
    squares.forEach(sq => {
      const moves = game.moves({ square: sq, verbose: true });
      if (moves.length) dests.set(sq, moves.map(m => m.to));
    });
    return dests;
  }

  function updateBoard() {
    ground.set({
      turnColor: 'white',
      movable: {
        dests: computeDests(),
        color: 'white'
      }
    });
  }
}
