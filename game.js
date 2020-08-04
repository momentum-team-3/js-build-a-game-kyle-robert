


function keyPresslistener(event) {
  if (event.key === "ArrowRight") {
    player.X += 10
  } else (event.key === "ArrowLeft") {
    player.X -= 10
  }
}


window.addEventListener('keydown', keyPresslistener(KeyboardEvent))

window.addEventListener('keyup',)