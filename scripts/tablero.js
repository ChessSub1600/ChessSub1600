document.addEventListener("DOMContentLoaded", () => {
  const boardElement = document.getElementById("chessboard");
  const jugadaText = document.getElementById("ultimaJugada");
  const resetBtn = document.getElementById("resetBoard");

  if (!boardElement || !jugadaText || !resetBtn) {
    console.warn("⚠️ Faltan elementos necesarios en el DOM");
    return;
  }

  const game = new Chess();

  const board = Chessboard(boardElement, {
    position: 'start',
    draggable: true,
    pieceTheme: 'img/chesspieces/wikipedia/{piece}.png',
    moveSpeed: 300,
    snapbackSpeed: 200,
    snap: true,
    onDrop: (source, target) => {
      const move = game.move({
        from: source,
        to: target,
        promotion: 'q'
      });

      if (move === null) {
        console.warn("🚫 Movimiento ilegal");
        return 'snapback';
      }

      // ✅ Mostrar en consola y pantalla
      console.log(`✅ Movimiento legal: ${move.san}`);
      console.log(`Movido: ${source} → ${target}`);
      jugadaText.textContent = `Movido: ${source} → ${target}`;
    }
  });

  // 🔁 Botón de reinicio
  resetBtn.addEventListener("click", () => {
    board.start();
    game.reset();
    jugadaText.textContent = "";
    console.log("🔄 Tablero reiniciado");
  });

  console.log("✅ Tablero cargado con piezas locales");
  let selectedSquare = null;

  boardElement.addEventListener("click", function (event) {
const square = event.target.closest("[data-square]")?.getAttribute("data-square");

    if (!square) {
      selectedSquare = null;
      return;
    }

    // Si aún no hay una pieza seleccionada
    if (!selectedSquare) {
      // Solo seleccionamos si hay una pieza del turno actual
      const piece = game.get(square);
      if (piece) {
        // Marcar casilla seleccionada visualmente
        const allSquares = boardElement.querySelectorAll('[data-square]');
        allSquares.forEach(el => el.classList.remove('selected'));

        const selectedEl = boardElement.querySelector(`[data-square="${square}"]`);
        if (selectedEl) selectedEl.classList.add('selected');

        selectedSquare = square;
        console.log(`🔸 Seleccionado: ${selectedSquare}`);
      }
    } else {
      const move = game.move({
        from: selectedSquare,
        to: square,
        promotion: 'q' // permite promover peones
      });

      if (move === null) {
        console.warn("🚫 Movimiento ilegal");
      } else {
        board.position(game.fen()); // actualiza visual
        jugadaText.textContent = `Movido: ${selectedSquare} → ${square}`;
        console.log(`✅ Movimiento legal: ${move.san}`);
      }

      selectedSquare = null; // reinicia para próxima jugada
    }
  });

});
