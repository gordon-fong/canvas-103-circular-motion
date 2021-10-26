const canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const ctx = canvas.getContext('2d')

// utility functions
const randNumBetween = (min, max, isInt) => {
  const randNum = Math.random() * (max - min) + min
  return (
    isInt ? Math.floor(randNum) : randNum
  )
}

let mouse = {xPos: 0, yPos: 0} 
const mouseUpdate = (e) => {
  // console.log(e)
  mouse.xPos = e.x
  mouse.yPos = e.y
}
addEventListener('mousemove', (e) => {
  mouseUpdate(e)
})

// object
function Particle (x, y, radius) {
  this.x = x
  this.y = y
  this.radius = radius
  this.radians = randNumBetween(0, Math.PI*2)
  this.velocity = randNumBetween(0.02, 0.05)
  this.distance = randNumBetween(100, 200)


  this.update = () => {
    const prevPos = {x: this.x, y: this.y}
    this.radians += this.velocity
    this.x = x + Math.cos(this.radians) * this.distance
    this.y = y + Math.sin(this.radians) * this.distance
    this.draw(prevPos)
  }

  this.draw = (prevPos) => {
    ctx.beginPath()
    // ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2)
    // ctx.fillStyle = 'red'
    // ctx.fill()
    ctx.lineWidth = this.radius
    ctx.moveTo(prevPos.x, prevPos.y)
    ctx.lineTo(this.x, this.y)
    ctx.stroke()
    ctx.closePath()
  }
}

let particles

const init = () => {
  particles = []

  for (i = 0; i < 100; i++) {
    const x = canvas.width/2
    const y = canvas.height/2
    const radius = randNumBetween (2, 5)
    particles.push(new Particle(x, y, radius))
  }
  console.log(particles)
}

const tick = () => {
  requestAnimationFrame(tick)
  // ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = "#f5f5f533"
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  particles.map(p => {
    p.update()
  })
}

init()
tick()