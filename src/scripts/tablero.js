import { Chess } from "chess.js";
import { Chessground } from "chessground";
import "chessground/assets/chessground.base.css";
import "chessground/assets/chessground.brown.css";

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("chessboard");
  if (!contenedor) {
    console.error("Contenedor no encontrado");
    return;
  }

  const game = new Chess();
  const board = Chessground(contenedor, {
    position: game.fen(),
    draggable: { enabled: true },
  });
});