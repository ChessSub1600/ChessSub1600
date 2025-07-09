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
});
