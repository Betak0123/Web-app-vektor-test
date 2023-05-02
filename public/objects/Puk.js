
class Puk {
    constructor(x, y, velx, vely) {
      this.velx = velx
      this.vely = vely
      this.startx = x
      this.starty = y
      this.pos = createVector(x, y);
      this.vel = createVector(velx, vely);
      this.score1 = score1
      this.radius = 30;
      this.xcheck = 0;
      this.ycheck = 0;
      this.speedcheck;

      this.xcheckB = 0;
      this.ycheckB = 0;
      this.speedcheckB;


      this.friction = 0.9;
      this.waitFrames = 3
    }
  
    collide() {
      if(this.waitFrames < 3){
        this.waitFrames +=1
      }
      if (this.pos.x <= 0 && this.pos.y >= windowHeight/2-windowHeight/5+5 && this.pos.y <= windowHeight/2+windowHeight/5+5  && !restarting){
        // Rød scorer
        score1.play()
        client.publish('shock','shockTwo')
        shock.play()
        restarting = true
        starter = 1
        points1 +=1
        pointDiv11.html(points1)
        pointDiv12.html(points1)
      }
      if (this.pos.x >= windowWidth && this.pos.y >= windowHeight/2-windowHeight/5+5 && this.pos.y <= windowHeight/2+windowHeight/5+5 && !restarting) {
        // Blå scorer 
        score2.play()
        starter = 0
        restarting = true
        client.publish('shock','shockOne')
        shock.play()
        points2 +=1
        pointDiv21.html(points2)
        pointDiv22.html(points2)
      }

      if(this.pos.x < -this.radius || this.pos.x > windowWidth + this.radius || this.pos.y < -this.radius || this.pos.y > windowHeight + this.radius){
        this.pos = createVector(this.startx, this.starty);
        this.vel = createVector(this.velx, this.vely);
      }

      let d = dist(this.xcheck, this.ycheck, this.pos.x, this.pos.y);
      if (d <= 80/2) {
        this.vel.mult(-1);
        this.vel.add(this.speedcheck);
      }

      let dB = dist(this.xcheckB, this.ycheckB, this.pos.x, this.pos.y);
      if (dB <= 80/2) {
        this.vel.mult(-1);
        this.vel.add(this.speedcheckB);
      }

      if (this.pos.x <= this.radius && this.pos.y >= windowHeight/2+windowHeight/5+5 && this.waitFrames == 3) {
        this.vel.x = this.vel.x * -1;
        VensN = 0
        this.Friction()
      }
      if (this.pos.x <= this.radius && this.pos.y <= windowHeight/2-windowHeight/5+5 && this.waitFrames == 3) {
        this.vel.x = this.vel.x * -1;
        VensO = 0
        this.Friction()
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
      this.avoidCollision(circleRed); // Check for collision with the circle before updating position
      this.avoidCollision(circleBlue); // Check for collision with the circle before updating position
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
  