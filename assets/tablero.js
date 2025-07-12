import { Chess } from "chess.js";
import { Chessground } from "chessground";

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("chessboard");
  const jugadaText = document.getElementById("ultimaJugada");
  const resetBtn = document.getElementById("resetBoard");
  const historialBox = document.getElementById("historialJugada");

  const game = new Chess();
  const historial = [];

  const board = Chessground(contenedor, {
    position: game.fen(),
    draggable: { enabled: true },
    events: {
      move: (from, to) => {
        const move = game.move({ from, to, promotion: "q" });
        if (move) {
          board.set({ position: game.fen() });
          jugadaText.textContent = `Movido: ${from} → ${to}`;
          historial.push(move.san);
          historialBox.textContent = historial.join(", ");
        } else {
          board.set({ position: game.fen() });
          console.warn("🚫 Movimiento ilegal");
        }
      },
    },
  });

  resetBtn.addEventListener("click", () => {
    game.reset();
    board.set({ position: game.fen() });
    jugadaText.textContent = "Última jugada: —";
    historial.length = 0;
    historialBox.textContent = "";
    console.log("🔄 Tablero reiniciado");
  });
});
