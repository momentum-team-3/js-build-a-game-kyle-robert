// Global constants and variables
// The document's canvas element
const canv = document.querySelector('#canvas')

// small helper for getting a new context
document.body.appendChild(canv)
const HEIGHT = canv.height
const WIDTH = canv.width
let animationID
const blasterVelocity = [0, -2]
const playerBlasterImg = new Image()
const playerImg = new Image()
const redEnemyImg = new Image()
const greenEnemyImg = new Image()
greenEnemyImg.src = 'Images/Space_rage128px/green_enemy.png'
redEnemyImg.src = 'Images/Space_rage128px/red_enemy.png'
playerBlasterImg.src = 'Images/Space_rage128px/Blaster_plasma_purple.png'
playerImg.src = 'Images/Space_rage128px/PlayerRed_Frame_01_png_processed.png'
const enemyImgs = [new Image()]
var playerAlive = true
const baseImageSize = 128 // 128 px
var blaster

class PlayerBlaster {
  constructor (x, y) {
    this.x = x
    this.y = y
    this.velocity = blasterVelocity
    this.numLives = 1
    this.blasterImg = playerBlasterImg
    this.isPlayer = false
    return this
  }
}
class Enemies {
  constructor (x, y) {
    this.x = x
    this.y = y
    this.enemyImg = greenEnemyImg
    this.isPlayer = false
    return this
  }
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

  playerShip.numLives = 3
  playerShip.height = baseImageSize
  playerShip.width = baseImageSize
  playerShip.xUpper = WIDTH - playerShip.width
  playerShip.yUpper = HEIGHT - playerShip.height
  playerShip.xLower = 0
  playerShip.yLower = 0

  return playerShip
}

var player = createPlayer(250, 575, playerImg, true)
var e1 = new Enemies(25, 0)
var e2 = new Enemies(125, 0)
var e3 = new Enemies(225, 0)
var e4 = new Enemies(325, 0)
var e5 = new Enemies(425, 0)

function keyPresslistener (event) {
  if (event.key === 'ArrowRight') {
    player.x += 10
  } else if (event.key === 'ArrowLeft') {
    player.x -= 10
  } else if (event.key === ' ') {
    blaster = new PlayerBlaster(player.x, player.y)
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

function drawImage (image, x, y) {
  const ctx = getContext()
  ctx.drawImage(image, x, y)
}

function drawFrame () {
  clearScreen()
  // if (areColliding(player, badguy)) {
  //   console.log('Oh no, an emergency!')
  // }
  drawImage(player.playerImg, player.x, player.y)
  drawImage(e1.enemyImg, e1.x, e1.y)
  drawImage(e2.enemyImg, e2.x, e2.y)
  drawImage(e3.enemyImg, e3.x, e3.y)
  drawImage(e4.enemyImg, e4.x, e4.y)
  drawImage(e5.enemyImg, e5.x, e5.y)
  drawImage(blaster.blasterImg, blaster.x, blaster.y)
  if (blaster) {
    blaster.x += blaster.velocity[0]
    blaster.y += blaster.velocity[1]
  }
}

// if (!playerAlive) {
//   alert('Game over!')
//   window.clearInterval(animationID)
// }

window.addEventListener('keydown', keyPresslistener)

document.querySelector('#start-button').addEventListener('click', () => animationID = window.setInterval(drawFrame, 20))
document.querySelector('#stop-button').addEventListener('click', () => window.clearInterval(animationID))
