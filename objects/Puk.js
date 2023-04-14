
class Puk {
    constructor(x, y) {
      this.pos = createVector(x, y);
      this.vel = createVector(3, 0);
      this.radius = 32;
      this.xcheck = 0;
      this.ycheck = 0;
      this.speedcheck;
    }
  
    collide() {
      let d = dist(this.xcheck, this.ycheck, this.pos.x, this.pos.y);
      if (d < this.radius * 2) {
        this.vel.mult(-1);
        this.vel.add(this.speedcheck);
      }
      if (this.pos.x < this.radius) {
        this.vel.x = this.vel.x * -1;
      }
      if (this.pos.x > windowWidth - this.radius) {
        this.vel.x = this.vel.x * -1;
      }
      if (this.pos.y < this.radius) {
        this.vel.y = this.vel.y * -1;
      }
      if (this.pos.y > windowHeight - this.radius) {
        this.vel.y = this.vel.y * -1;
      }
    }
  
avoidCollision(circle) {
    let nextPos = this.vel.magSq() === 0 ? this.pos : p5.Vector.add(this.pos, this.vel);
    let distToCircle = p5.Vector.dist(nextPos, circle.pos);
    let minDist = this.radius + circle.radius;
    if (distToCircle < minDist) {
      // Calculate a vector to move the puk away from the circle's center
      let moveVec = p5.Vector.sub(this.pos, circle.pos).normalize().mult(minDist - distToCircle);
      this.pos.add(moveVec);
    }
}

  
    update() {
        this.avoidCollision(circle); // Check for collision with the circle before updating position
      this.pos.add(this.vel);
    }
  
    show() {
      strokeWeight(0.5);
      fill(100, 40);
      ellipse(this.pos.x - 6 * this.vel.x, this.pos.y - 6 * this.vel.y, this.radius - 20);
  
      strokeWeight(1);
      fill(170, 70);
      ellipse(this.pos.x - 4 * this.vel.x, this.pos.y - 4 * this.vel.y, this.radius - 10);
  
      stroke(255);
      strokeWeight(2);
      fill(255, 100);
      ellipse(this.pos.x, this.pos.y, this.radius);
    }
  }
  