var planets = []

function setup() {
  createCanvas(windowWidth, windowHeight)
  init(2)
}

function init(n) {  
  planets = []
  colorMode(RGB)
  background(128)
  for (var i = 0; i < n; i++) {
    var pos = p5.Vector.fromAngle(i * TWO_PI / n).setMag(100)
    var v = p5.Vector.fromAngle(i * TWO_PI / n + HALF_PI).setMag(n / 2.0)
    var c = i * 255.0 / n
    planets.push(new Planet(pos, v, c))
  }
  setTimeout(function() {
    init(n + 1)  
  }, 10000);
}

function draw() {
//  colorMode(RGB)
//  background(128, 128, 128, 5)
  push()
  translate(width / 2, height / 2)
  update()

  for (var i = 0; i < planets.length; i++) {
    planets[i].render()
  }
  pop()
}

function update() {
  for (var i = 0; i < planets.length; i++) {
    for (var j = 0; j < planets.length; j++) {
      if (i != j) {
        var v = p5.Vector.sub(planets[i].pos, planets[j].pos)
        var r = v.mag()
        var f = 1000 / (r * r)
        planets[i].applyForce(v.setMag(-f))
      }
    }
  }
  for (var k = 0; k < planets.length; k++) {
    planets[k].update()
  }
}

function Planet(pos, v, c) {
  this.pos = pos
  this.v = v
  this.c = c
  this.r = 5;
  this.force = createVector()
  
  this.render = function() {
    colorMode(HSB)
    stroke((c + 128) % 255, 255, 255)
    fill(c, 255, 255)
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2)
  }
  
  this.update = function() {
    this.v.add(this.force)
    this.force = createVector()
    this.pos.add(v)
  }
  
  this.applyForce = function(f) {
    this.force.add(f)
  }
}