export const addMoves = (player) => {
    window.addEventListener('keydown', (e) => {
      if (e.key === "D" || e.key === "d" || e.key === "ArrowRight") {
        player.position.x += 0.5;
      }
      if (e.key === "A" || e.key === "a" || e.key === "ArrowLeft") {
        player.position.x -= 0.5;
      }
    });
  }