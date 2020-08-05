// Global constants and variables
// The document's canvas element
const canv = document.querySelector('#canvas')

// small helper for getting a new context
document.body.appendChild(canv)
const HEIGHT = canv.height
const WIDTH = canv.width
const CHARTREUSE = 'rgb(127,255,0)'
let animationID
const playerImg = new Image()
playerImg.src('Images/Space_rage128px/PlayerRed_Frame_01_png_processed.png')
var playerAlive = true

function drawPlayerImage (x, y, xScale, yScale, image) {
  const ctx = getContext()
  ctx.drawImage(image, x, y, xScale, yScale)
}

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

const player = createPlayer(250, 950, 50, 50, CHARTREUSE, true)

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
  return canv.getContext('2d')
}

function clearScreen () {
  const context = getContext()
  context.clearRect(0, 0, WIDTH, HEIGHT)
}

// function drawImage (x, y, width, height, playerImg) {
//   const ctx = getContext()

//   ctx.fillRect(x, y, width, height)
// }

function drawFrame () {
  clearScreen()
  // if (areColliding(player, badguy)) {
  //   console.log('Oh no, an emergency!')
  // }
  drawPlayerImage(player.X, player.Y, player.Width, player.Height, playerImg)
}

window.addEventListener('keydown', keyPresslistener)

document.querySelector('#start-button').addEventListener('click', animationID => window.setInterval(drawFrame, 20))
document.querySelector('#stop-button').addEventListener('click', () => window.clearInterval(animationID))
