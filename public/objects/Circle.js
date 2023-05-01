


class Circle {
    constructor(x , y){
        this.pos = createVector(x, y)
        this.vel = createVector(0, 0)
        this.keypress
        this.speed = 5
        this.radius = 50

    }
        update(down, up, left, right) {
            
            if(up){
                this.vel.set(0,-this.speed)
            }
            if(down){
                this.vel.set(0,this.speed)
            }
            if(right){
                this.vel.set(this.speed,0)
            }
            if(left){
                this.vel.set(-this.speed,0)
            }
            if(up && left){
                this.vel.set(-this.speed,-this.speed)
            }
            if(up && right){
                this.vel.set(this.speed,-this.speed)
            }
            if(down && right){
                this.vel.set(this.speed,this.speed)
            }
            if(down && left){
                this.vel.set(-this.speed,this.speed)
            }
            if(!down && !right && !up && !left){
                this.vel.set(0,0)
            }
            this.pos.add(this.vel)


            if(keyIsDown(UP_ARROW)){
                this.vel.set(0,-this.speed)
            }
            if(keyIsDown(DOWN_ARROW)){
                this.vel.set(0,this.speed)
            }
            if(keyIsDown(RIGHT_ARROW)){
                this.vel.set(this.speed,0)
            }
            if(keyIsDown(LEFT_ARROW)){
                this.vel.set(-this.speed,0)
            }
            if(keyIsDown(UP_ARROW) && keyIsDown(LEFT_ARROW)){
                this.vel.set(-this.speed,-this.speed)
            }
            if(keyIsDown(UP_ARROW) && keyIsDown(RIGHT_ARROW)){
                this.vel.set(this.speed,-this.speed)
            }
            if(keyIsDown(DOWN_ARROW) && keyIsDown(RIGHT_ARROW)){
                this.vel.set(this.speed,this.speed)
            }
            if(keyIsDown(DOWN_ARROW) && keyIsDown(LEFT_ARROW)){
                this.vel.set(-this.speed,this.speed)
            }
            if(!keyIsDown(DOWN_ARROW) && !keyIsDown(RIGHT_ARROW) && !keyIsDown(UP_ARROW) && !keyIsDown(LEFT_ARROW)){
                this.vel.set(0,0)
            }
            this.pos.add(this.vel)
        }



        show() {
            stroke(255)
            strokeWeight(2)
            fill(255, 100)
            ellipse(this.pos.x, this.pos.y, this.radius)
        }
}