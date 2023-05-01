
class Puk {
    constructor(x, y, score1) {
      this.pos = createVector(x, y);
      this.vel = createVector(3, 0);
      this.score1 = score1
      this.radius = 30;
      this.xcheck = 0;
      this.ycheck = 0;
      this.friction = 0.9;
      this.waitFrames = 3
      this.speedcheck;
    }
  
    collide() {
      if(this.waitFrames < 3){
        this.waitFrames +=1
      }

      let d = dist(this.xcheck, this.ycheck, this.pos.x, this.pos.y);
      if (d <= 80/2) {
        this.vel.mult(-1);
        this.vel.add(this.speedcheck);
      }

      if (this.pos.x <= this.radius && this.pos.y >= windowHeight/2+windowHeight/5+5 && this.waitFrames == 3) {
        this.vel.x = this.vel.x * -1;
        VensN = 0
        this.Friction()
      }
      if (this.pos.x <= this.radius && this.pos.y <= windowHeight/2-windowHeight/5+5 && this.waitFrames == 3) {
        this.vel.x = this.vel.x * -1;
        VensO = 0
        this.score1.Friction()
      }
      if (this.pos.x <= 0) {
        score1.play()
        console.log('Halla min brors!')
      }
      if (this.pos.x >= windowWidth) {
        
        console.log('Halla min brors!')
      }

      if (this.pos.x >= windowWidth - this.radius && this.pos.y >= windowHeight/2+windowHeight/5+5 && this.waitFrames == 3 ) {
        this.vel.x = this.vel.x * -1;
        HøjN = 0
        this.Friction()
      }
      if (this.pos.x >= windowWidth - this.radius && this.pos.y <= windowHeight/2-windowHeight/5+5 && this.waitFrames == 3) {
        this.vel.x = this.vel.x * -1;
        HøjO = 0
        this.Friction()
      }

      if (this.pos.y <= this.radius && this.waitFrames == 3) {
        this.vel.y = this.vel.y * -1;
        VandO = 0
        this.Friction()
      }

      if (this.pos.y > windowHeight - this.radius && this.waitFrames == 3) {
        this.vel.y = this.vel.y * -1;
        VandN = 0
        this.Friction()
      }
    }

    Friction(){
      this.waitFrames = 0
      this.vel.mult(this.friction);
      this.vel.x = round(this.vel.x)
      this.vel.y = round(this.vel.y)
      // console.log(this.vel)
    }
  
    avoidCollision(circle) {
        let nextPos = this.vel.magSq() === 0 ? this.pos : p5.Vector.add(this.pos, this.vel);
        let distToCircle = p5.Vector.dist(nextPos, circle.pos);
        let minDist = this.radius/2 + circle.radius/2;
        // console.log(minDist)
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
  