// Global constants and variables
// The document's canvas element
const canv = document.querySelector('#canvas')
// small helper for getting a new context
document.body.appendChild(canv)
const HEIGHT = canv.height
const WIDTH = canv.width
const CHARTREUSE = 'rgb(127,255,0)'
var playerAlive = true

function createPlayer (x, y, height, width, color, isPlayer) {
  return {
    X: x,
    Y: y,
    Height: height,
    Width: width,
    xUpper: WIDTH - width,
    yUpper: HEIGHT - height,
    xLower: 0,
    yLower: 0,
    color: color,
    isPlayer: isPlayer
  }
}

const player = createPlayer(250, 950, 100, 200, CHARTREUSE, true)

// function createPlayer (x, y, playerWidth, isPlayer) {
//   const player = {
//     X: x,
//     Y: y,
//     Width: playerWidth,
//     xUpper: WIDTH - playerWidth,
//     xLower: 0,
//     isPlayer: isPlayer
//   }
// }

function keyPresslistener (event) {
  if (event.key === 'ArrowRight') {
    player.X += 10
  } else if (event.key === 'ArrowLeft') {
    player.X -= 10
  }
  if (player.X > player.xUpper) {
    player.X = player.xLower
  }
  if (player.X < player.xLower) {
    player.X = player.xUpper
  }
}

// get a new 2d drawing context
function getContext () {
  return canv.getContext("2d")
}

function clearScreen () {
  const context = getContext()
  context.clearRect(0, 0, WIDTH, HEIGHT)
}

createPlayer(250, 950, 50, 50, true)

function drawPlayer (x, y, width, height, color) {
  const ctx = getContext()

  ctx.fillStyle = color
  ctx.fillRect(x, y, width, height)
}

function drawFrame () {
  clearScreen()
  // if (areColliding(player, badguy)) {
  //   console.log('Oh no, an emergency!')
  // }
  drawPlayer(player.X, player.Y, player.Width, player.Height, player.color)
}

window.addEventListener('keydown', keyPresslistener)

document.querySelector("#start-button").addEventListener("click", () => animationID = window.setInterval(drawFrame,20))

let animationID = window.setInterval(drawFrame, 50)
