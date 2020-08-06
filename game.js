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

// create random integers for our velocity function
function randomInteger (min, max) {
  if (min === max) {
    min = max - 1
  }
  const range = max - min + 1
  const randInt = Math.ceil(Math.random() * range)
  return min + randInt
}

// the Player's blaster class
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

// Enemy class
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

// ship object, not really needed.
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

// creat player object
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

// create player and enemies
var player = createPlayer(250, 575, playerImg, true)
var e1 = new Enemies(25, 0)
var e2 = new Enemies(125, 0)
var e3 = new Enemies(225, 0)
var e4 = new Enemies(325, 0)
var e5 = new Enemies(425, 0)
const enemyList = [e1, e2, e3, e4, e5]

// event listeners
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

// element wise enemy array update
function updateEnemy (enemy) {
  enemy.x += enemy.velocity[0]
  enemy.y += enemy.velocity[1]

  if (enemy.x > enemy.xMax) {
    enemy.x = enemy.xMax
    enemy.velocity[0] *= -1
  } else if (enemy.x < enemy.xMin) {
    enemy.x = enemy.xMin
    enemy.velocity[0] *= -1
  }

  if (enemy.y > enemy.yMax) {
    enemy.y = enemy.yMax
    enemy.velocity[1] *= -1
  } else if (enemy.y < enemy.yMin) {
    enemy.y = enemy.yMin
    enemy.velocity[1] *= -1
  }
}

// test for collisions
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

// clear screen
function clearScreen () {
  const context = getContext()
  context.clearRect(0, 0, WIDTH, HEIGHT)
}

// draw each Image function
function drawImage (image, x, y) {
  const ctx = getContext()
  ctx.drawImage(image, x, y)
}

// draw Score on canvas
function drawScore () {
  const ctx = getContext()
  ctx.font = '15px Serif'
  ctx.fillStyle = 'rgb(255, 0, 0'
  ctx.fillText('Score: ' + score, 10, 15)
}

// refresh frame
function drawFrame () {
  clearScreen()
  drawScore()
  drawImage(player.playerImg, player.x, player.y)
  if (playerAlive) {
    for (let i = 0; i < enemyList.length; i++) {
      drawImage(enemyList[i].enemyImg, enemyList[i].x, enemyList[i].y)
      updateEnemy(enemyList[i])
      if (blaster) {
        drawImage(blaster.blasterImg, blaster.x, blaster.y)
        blaster.x += blaster.velocity[0]
        blaster.y += blaster.velocity[1]
        if (isColliding(enemyList[i], blaster)) {
          enemyList[i].removeFromArray(enemyList)
        } else {
          if (enemyList[i]) {
            updateEnemy(enemyList[i])
          }
        }
      }
    }
  } else {
    alert('Game over!')
    window.clearInterval(animationID)
  }
}

window.addEventListener('keydown', keyPresslistener)

document.querySelector('#start-button').addEventListener('click', () => animationID = window.setInterval(drawFrame, 20))
document.querySelector('#stop-button').addEventListener('click', () => window.clearInterval(animationID))
