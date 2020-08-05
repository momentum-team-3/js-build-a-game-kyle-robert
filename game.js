// Global constants and variables
// The document's canvas element
const canv = document.querySelector('#canvas')

// small helper for getting a new context
document.body.appendChild(canv)
const HEIGHT = canv.height
const WIDTH = canv.width
let animationID
const blasterVelocity = [0, 3]
const playerBlaster = new Image()
const playerImg = new Image()
playerBlaster.src = 'Images/Space_rage128px/Blaster_plasma_purple.png'
playerImg.src = 'Images/Space_rage128px/PlayerRed_Frame_01_png_processed.png'
var playerAlive = true
const baseImageSize = 128 // 128 px

function makeBlaster (x, y) {
  const blaster = {
    x: x,
    y: y,
    velocity: blasterVelocity,
    numLives: 1,
    blasterImg: playerBlaster,
    isPlayer: false
  }
  return blaster
}

function makeShip (x, y, image, isPlayer) {
  const ship = {
    x: x,
    y: y,
    playerImg: image,
    isPlayer: isPlayer,
    radius: () => Math.floor((baseImageSize) / 2)
  }
  return ship
}

function createPlayer (x, y, image, isPlayer) {
  var playerShip = makeShip(
    x,
    y,
    image,
    isPlayer)

  // playerShip.playerImg = playerImg
  playerShip.numLives = 3
  playerShip.height = baseImageSize
  playerShip.width = baseImageSize
  playerShip.xUpper = WIDTH - playerShip.width
  playerShip.yUpper = HEIGHT - playerShip.height
  playerShip.xLower = 0
  playerShip.yLower = 0

  playerShip.blaster = makeBlaster(playerShip.x, playerShip.y)
  return playerShip
}

var player = createPlayer(250, 575, playerImg, true)

function updateBlasterPosition () {
  player.blaster.x += player.blaster.velocity[0]
  player.blaster.y += player.blaster.velocity[1]
}

function fireBlaster () {
  updateBlasterPosition()
}

function keyPresslistener (event) {
  if (event.key === 'ArrowRight') {
    player.x += 10
  } else if (event.key === 'ArrowLeft') {
    player.x -= 10
  } else if (event.key === 'ArrowUp') {
    fireBlaster()
  }
  if (player.x > player.xUpper) {
    player.x = player.xLower
  }
  if (player.x < player.xLower) {
    player.x = player.xUpper
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

function drawPlayerImage (image, x, y) {
  const ctx = getContext()
  ctx.drawImage(image, x, y)
}

function drawFrame () {
  clearScreen()
  // if (areColliding(player, badguy)) {
  //   console.log('Oh no, an emergency!')
  // }
  updateBlasterPosition()
  drawPlayerImage(player.playerImg, player.x, player.y)
}

// if (!playerAlive) {
//   alert('Game over!')
//   window.clearInterval(animationID)
// }

window.addEventListener('keydown', keyPresslistener)

document.querySelector('#start-button').addEventListener('click', () => animationID = window.setInterval(drawFrame, 20))
document.querySelector('#stop-button').addEventListener('click', () => window.clearInterval(animationID))
