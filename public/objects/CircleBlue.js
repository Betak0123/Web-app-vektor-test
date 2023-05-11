


class CircleBlue {
    constructor(x , y){
        this.pos = createVector(x, y)
        this.vel = createVector(0, 0)
        this.keypress
        this.speed = 6
        this.radius = 50

    }
        update(down, up, left, right) {

            // Sørg for at man ikke kan rykke sig ud
            if(this.pos.x < this.radius){
                left = false
            }
            if(this.pos.x > windowWidth/2 - this.radius){
                right = false
            }
            if(this.pos.y < this.radius){
                up = false
            }
            if(this.pos.y > windowHeight - this.radius){
                down = false
            }

            // sæt hastighed ud fra input af joystick
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


            // if(keyIsDown(87)){
            //     this.vel.set(0,-this.speed)
            // }
            // if(keyIsDown(83)){
            //     this.vel.set(0,this.speed)
            // }
            // if(keyIsDown(68)){
            //     this.vel.set(this.speed,0)
            // }
            // if(keyIsDown(65)){
            //     this.vel.set(-this.speed,0)
            // }
            // if(keyIsDown(87) && keyIsDown(65)){
            //     this.vel.set(-this.speed,-this.speed)
            // }
            // if(keyIsDown(87) && keyIsDown(68)){
            //     this.vel.set(this.speed,-this.speed)
            // }
            // if(keyIsDown(83) && keyIsDown(68)){
            //     this.vel.set(this.speed,this.speed)
            // }
            // if(keyIsDown(83) && keyIsDown(65)){
            //     this.vel.set(-this.speed,this.speed)
            // }
            // if(!keyIsDown(83) && !keyIsDown(68) && !keyIsDown(87) && !keyIsDown(65)){
            //     this.vel.set(0,0)
            // }
            // this.pos.add(this.vel)
        }



        show() {
            // tegn cirklen
            drawingContext.shadowColor = color('blue')
            stroke('blue')
            strokeWeight(2)
            fill('blue')
            ellipse(this.pos.x, this.pos.y, this.radius)
        }
}