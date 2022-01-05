
const grid = document.querySelector('.grid')
const squares = Array.from(document.querySelectorAll('.grid div'))
// const items = document.querySelectorAll('.grid div')
const scoreDisplay = document.querySelector('#score')
const startButton = document.querySelector('#start-button')
const width = 10

const lShape = [
  [1, width + 1, width*2 + 1, 2],
  [width, width + 1, width + 2, width*2 + 2],
  [1, width + 1, width*2 + 1, width*2],
  [width, width*2, width*2 + 1, width*2 + 2],
]
const zShape = [
  [width+1, width+2, width*2, width*2+1],
  [0, width, width+1, width*2+1],
  [width+1, width+2, width*2, width*2+1],
  [0, width, width+1, width*2+1],
]
const tShape = [
  [1, width, width+1, width+2],
  [1, width+1, width+2, width*2+1],
  [width, width+1, width+2, width*2+1],
  [1, width, width+1, width*2+1],
]
const oShape = [
  [0, 1, width, width+1],
  [0, 1, width, width+1],
  [0, 1, width, width+1],
  [0, 1, width, width+1],
]
const iShape = [
  [1, width+1, width*2+1, width*3+1],
  [width, width+1, width+2, width+3],
  [1, width+1, width*2+1, width*3+1],
  [width, width+1, width+2, width+3],
]

const shapes = [lShape, zShape, tShape, oShape, iShape]


let currentPosition = 4
let currentRotation = 0
let random = Math.floor(Math.random()*shapes.length)
let current = shapes[random][currentRotation]

function drow() {
  current.forEach(index => {
    squares[currentPosition + index].classList.add('activeSquare')
  })
}

function undrow() {
  current.forEach(index => {
    squares[currentPosition + index].classList.remove('activeSquare')
  })
}

timerId = window.setInterval(moveDown, 500)

function moveDown() {
  undrow()
  currentPosition += width
  drow()
  freeze()
}

function freeze() {
  if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
    current.forEach(index => squares[currentPosition+index].classList.add('taken'))
    random = Math.floor(Math.random()*shapes.length)
    current = shapes[random][currentRotation]
    currentPosition = 4
    drow()
  }
}


