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
var playerAlive = true
const baseImageSize = 128 // 128 px
var blaster

function randomInteger (min, max) {
  if (min === max) {
    min = max - 1
  }
  const range = max - min + 1
  const randInt = Math.ceil(Math.random() * range)
  return min + randInt
}

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
    this.xMin = 0
    this.xMax = 440
    this.yMin = 0
    this.yMax = 220
    this.velocity = [randomInteger(-1.75, 1.75), randomInteger(-1.75, 1.75)]
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
  if (player.x > 440) {
    player.x = player.xLower
  }
  if (player.x < player.xLower) {
    player.x = 440
  }
}

function updateEnemies () {
  if (e1.x > e1.xMax) {
    e1.x = e1.xMax
    e1.velocity[0] *= -1
  } else if (e1.x < e1.xMin) {
    e1.x = e1.xMin
    e1.velocity[0] *= -1
  }
  if (e1.y > e1.yMax) {
    e1.y = e1.yMax
    e1.velocity[1] *= -1
  } else if (e1.y < e1.yMin) {
    e1.y = e1.yMin
    e1.velocity[1] *= -1
  }
  if (e2.x > e2.xMax) {
    e2.x = e2.xMax
    e2.velocity[0] *= -1
  } else if (e2.x < e2.xMin) {
    e2.x = e2.xMin
    e2.velocity[0] *= -1
  }
  if (e2.y > e2.yMax) {
    e2.y = e2.yMax
    e2.velocity[1] *= -1
  } else if (e2.y < e2.yMin) {
    e2.y = e2.yMin
    e2.velocity[1] *= -1
  }
  if (e3.x > e3.xMax) {
    e3.x = e3.xMax
    e3.velocity[0] *= -1
  } else if (e3.x < e3.xMin) {
    e3.x = e3.xMin
    e3.velocity[0] *= -1
  }
  if (e3.y > e3.yMax) {
    e3.y = e3.yMax
    e3.velocity[1] *= -1
  } else if (e3.y < e3.yMin) {
    e3.y = e3.yMin
    e3.velocity[1] *= -1
  }
  if (e4.x > e4.xMax) {
    e4.x = e4.xMax
    e4.velocity[0] *= -1
  } else if (e4.x < e4.xMin) {
    e4.x = e4.xMin
    e4.velocity[0] *= -1
  }
  if (e4.y > e4.yMax) {
    e4.y = e4.yMax
    e4.velocity[1] *= -1
  } else if (e4.y < e4.yMin) {
    e4.y = e4.yMin
    e4.velocity[1] *= -1
  }
  if (e5.x > e5.xMax) {
    e5.x = e5.xMax
    e5.velocity[0] *= -1
  } else if (e5.x < e5.xMin) {
    e5.x = e5.xMin
    e5.velocity[0] *= -1
  }
  if (e5.y > e5.yMax) {
    e5.y = e5.yMax
    e5.velocity[1] *= -1
  } else if (e5.y < e5.yMin) {
    e5.y = e5.yMin
    e5.velocity[1] *= -1
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
  updateEnemies()
  e1.x += e1.velocity[0]
  e1.y += e1.velocity[1]
  e2.x += e2.velocity[0]
  e2.y += e2.velocity[1]
  e3.x += e3.velocity[0]
  e3.y += e3.velocity[1]
  e4.x += e4.velocity[0]
  e4.y += e4.velocity[1]
  e5.x += e5.velocity[0]
  e5.y += e5.velocity[1]
  drawImage(blaster.blasterImg, blaster.x, blaster.y)
  blaster.x += blaster.velocity[0]
  blaster.y += blaster.velocity[1]
}

// if (!playerAlive) {
//   alert('Game over!')
//   window.clearInterval(animationID)
// }

window.addEventListener('keydown', keyPresslistener)

document.querySelector('#start-button').addEventListener('click', () => animationID = window.setInterval(drawFrame, 20))
document.querySelector('#stop-button').addEventListener('click', () => window.clearInterval(animationID))
