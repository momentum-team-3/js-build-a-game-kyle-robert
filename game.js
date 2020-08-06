// Global constants and variables
// The document's canvas element
const canv = document.querySelector('#canvas')

// small helper for getting a new context
document.body.appendChild(canv)
const HEIGHT = canv.height
const WIDTH = canv.width
let animationID
const blasterVelocity = [0, -4]
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
const score = 0

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
    this.width = 9 // 9 px
    this.height = 26 // 26 px
    this.velocity = blasterVelocity
    this.isAlive = true
    this.blasterImg = playerBlasterImg
    this.isPlayer = false
  }
}
class Enemies {
  constructor (x, y) {
    this.x = x
    this.y = y
    this.width = 64 // 64 px
    this.height = 64 // 64 px
    this.xMin = 0
    this.xMax = 440
    this.yMin = 20
    this.yMax = 220
    this.isAlive = true
    this.velocity = [randomInteger(-1.75, 1.75), randomInteger(-1.75, 1.75)]
    this.enemyImg = greenEnemyImg
    this.isPlayer = false
  }

  removeFromArray (array) {
    array.splice(array.indexOf(this), 1)
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
  playerShip.height = 64 // 64 px
  playerShip.width = 64 // 64 px
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
const enemyList = [e1, e2, e3, e4, e5]

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

function isColliding (enemy, blaster) {
  if (((enemy.x < blaster.x + blaster.width) && (enemy.x + enemy.width) > blaster.x) && ((enemy.y < blaster.y + blaster.height) && (enemy.y + enemy.height) > blaster.y)) {
    enemy.isAlive = false
    return true
  } else {
    return false
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

function drawScore () {
  const ctx = getContext()
  ctx.font = '15px Serif'
  ctx.fillStyle = 'rgb(255, 0, 0'
  ctx.fillText('Score: ' + score, 10, 15)
}

function drawFrame () {
  clearScreen()
  // if (isColliding) {

  // }
  drawScore()
  drawImage(player.playerImg, player.x, player.y)
  drawImage(e1.enemyImg, e1.x, e1.y)
  drawImage(e2.enemyImg, e2.x, e2.y)
  drawImage(e3.enemyImg, e3.x, e3.y)
  drawImage(e4.enemyImg, e4.x, e4.y)
  drawImage(e5.enemyImg, e5.x, e5.y)
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
  updateEnemies()
  if (blaster) {
    drawImage(blaster.blasterImg, blaster.x, blaster.y)
    blaster.x += blaster.velocity[0]
    blaster.y += blaster.velocity[1]
    for (let i = 0; i < enemyList.length; i++) {
      if (isColliding(enemyList[i], blaster)) {
        enemyList[i].removeFromArray(enemyList)
        // } else {
        //   drawImage(enemyList[i].enemyImg, enemyList[i].x, enemyList[i].y)
        //   enemyList[i].x = enemyList[i].velocity[0]
        //   enemyList[i].y = enemyList[i].velocity[1]
        // }
      }
    }
  }
}

if (!playerAlive) {
  alert('Game over!')
  window.clearInterval(animationID)
}

window.addEventListener('keydown', keyPresslistener)

document.querySelector('#start-button').addEventListener('click', () => animationID = window.setInterval(drawFrame, 20))
document.querySelector('#stop-button').addEventListener('click', () => window.clearInterval(animationID))
