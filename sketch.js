let planets

function setup() {
  createCanvas(windowWidth, windowHeight)
  init(2)
}

function init(n) {
  planets = []
  colorMode(RGB)
  background(128)
  for (let i = 0; i < n; i++) {
    const angle = map(i, 0, n, 0, TWO_PI)
    const pos = p5.Vector.fromAngle(angle).setMag(100)
    const v = p5.Vector.fromAngle(angle + HALF_PI).setMag(n / 2.0)
    const c = map(i, 0, n, 0, 255)
    planets.push(new Planet(pos, v, c))
  }
  setTimeout(function () {
    init(n + 1)
  }, 10000);
}

function draw() {
  push()
  translate(width / 2, height / 2)
  update()

  planets.forEach(p => p.render())
  pop()
}

function update() {
  planets.forEach(p1 => planets.forEach(p2 => {
    if (p1 != p2) {
      const v = p5.Vector.sub(p1.pos, p2.pos)
      const r = v.mag()
      const f = 1000 / (r * r)
      p1.applyForce(v.setMag(-f))
    }
  }))
  planets.forEach(p => p.update())
}

class Planet {
  constructor(pos, v, c) {
    this.pos = pos
    this.v = v
    this.c = c
    this.r = 5;
    this.force = createVector()
  }

  render() {
    colorMode(HSB)
    stroke((this.c + 128) % 255, 255, 255)
    fill(this.c, 255, 255)
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2)
  }

  update() {
    this.v.add(this.force)
    this.pos.add(this.v)

    this.force = createVector()
  }

  applyForce(f) {
    this.force.add(f)
  }
}