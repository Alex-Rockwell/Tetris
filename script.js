const grid = document.querySelector('.grid')
const minigrid = document.querySelector('.minigrid')

function drawGrid() {
  for (let i=0; i<200; i++) {
    let div = document.createElement('div')
    grid.appendChild(div)
  }
  
  for (let i=0; i<10; i++) {
    let div = document.createElement('div')
    div.classList.add('taken')
    grid.appendChild(div)
  }

  for (let i=0; i<16; i++) {
    let div = document.createElement('div')
    minigrid.appendChild(div)
  }
}

drawGrid()

let squares = Array.from(document.querySelectorAll('.grid div'))
const scoreDisplay = document.querySelector('#score')
const startButton = document.querySelector('#start-button')
const width = 10
let nextRandom = 0
let timerId
let score = 0
const colors = [
  'orange',
  'red',
  'purple',
  'green',
  'blue'
]

const lShape = [
  [1, width + 1, width*2 + 1, 2],
  [width, width + 1, width + 2, width*2 + 2],
  [1, width + 1, width*2 + 1, width*2],
  [width, width*2, width*2 + 1, width*2 + 2]
]
const zShape = [
  [width+1, width+2, width*2, width*2+1],
  [0, width, width+1, width*2+1],
  [width+1, width+2, width*2, width*2+1],
  [0, width, width+1, width*2+1]
]
const tShape = [
  [1, width, width+1, width+2],
  [1, width+1, width+2, width*2+1],
  [width, width+1, width+2, width*2+1],
  [1, width, width+1, width*2+1]
]
const oShape = [
  [0, 1, width, width+1],
  [0, 1, width, width+1],
  [0, 1, width, width+1],
  [0, 1, width, width+1]
]
const iShape = [
  [1, width+1, width*2+1, width*3+1],
  [width, width+1, width+2, width+3],
  [1, width+1, width*2+1, width*3+1],
  [width, width+1, width+2, width+3]
]

const shapes = [lShape, zShape, tShape, oShape, iShape]


let currentPosition = 4
let currentRotation = 0
let random = Math.floor(Math.random()*shapes.length)
let current = shapes[random][currentRotation]

function draw() {
  current.forEach(index => {
    squares[currentPosition + index].classList.add('activeSquare')
    squares[currentPosition + index].style.backgroundColor = colors[random]  
  })
}

function undraw() {
  current.forEach(index => {
    squares[currentPosition + index].classList.remove('activeSquare')
    squares[currentPosition + index].style.backgroundColor = ''  
  })
}


function control(e) {
  if (e.keyCode === 37) {
    moveLeft()
  } else if (e.keyCode === 38) {
    rotate()
  } else if (e.keyCode === 39) {
    moveRight()
  } else if (e.keyCode === 40) {
    moveDown()
  }
}

document.addEventListener('keyup', control)

function moveDown() {
  undraw()
  currentPosition += width
  draw()
  freeze()
}

function freeze() {
  if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
    current.forEach(index => squares[currentPosition+index].classList.add('taken'))
    random = nextRandom
    nextRandom = Math.floor(Math.random()*shapes.length)
    current = shapes[random][currentRotation]
    currentPosition = 4
    draw()
    displayShape()
    addScore()
    gameOver()
  }
}

function moveLeft() {
  undraw()
  const isAtLeftEdge = current.some(index => ((currentPosition + index) % width) === 0)
  if (!isAtLeftEdge) currentPosition -= 1
  if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
    currentPosition += 1
  }
  draw()
}

function moveRight() {
  undraw()
  const isAtRightEdge = current.some(index => ((currentPosition + index + 1) % width) === 0)
  if (!isAtRightEdge) currentPosition += 1
  if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
    currentPosition -= 1
  }
  draw()
}

function rotate() {
  undraw()
  currentRotation ++
  if (currentRotation === current.length) {
    currentRotation = 0
  }
  current = shapes[random][currentRotation]
  draw()
}

////////////Display next shapes in mini-grid

const displaySquares = document.querySelectorAll('.minigrid div')
const displayWidth = 4
const displayIndex = 0

const nextShape = [
  [1, displayWidth + 1, displayWidth*2 + 1, 2],
  [displayWidth+1, displayWidth+2, displayWidth*2, displayWidth*2+1],
  [1, displayWidth, displayWidth+1, displayWidth+2],
  [0, 1, displayWidth, displayWidth+1],
  [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1],
]

function displayShape() {
  displaySquares.forEach(square => {
    square.classList.remove('activeSquare')
    square.style.backgroundColor = '' 
  })
  nextShape[nextRandom].forEach(index => {
    displaySquares[displayIndex + index].classList.add('activeSquare')
    displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom] 
  })
}

startButton.addEventListener('click', () => {
  scoreDisplay.textContent = score
  if (timerId) {
    clearInterval(timerId)
    timerId = 0
  } else {
    draw()
    timerId = setInterval(moveDown, 300)
    nextRandom = Math.floor(Math.random()*shapes.length)
    displayShape()
  }
})

function addScore() {
  for (let i=0; i < 199; i += width) {
    const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

    if (row.every(index => squares[index].classList.contains('taken'))) {
      score += 10
      scoreDisplay.textContent = score
      row.forEach(index => {
        squares[index].classList.remove('taken')
        squares[index].classList.remove('activeSquare')
        squares[index].style.backgroundColor = ''
      })
      let squaresRemoved = squares.splice(i, width)
      squares = squaresRemoved.concat(squares)
      squares.forEach(cell => grid.appendChild(cell))
    }
  }
}

function gameOver() {
  if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
    scoreDisplay.textContent = 'Game over'
    clearInterval(timerId)
  }
}




