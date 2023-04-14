let puk, circle
function setup(){
    frameRate(60)
    createCanvas(windowWidth, windowHeight)
    background('black')   
    puk = new Puk(windowWidth/2, windowHeight/2)
    circle = new Circle(3*windowWidth/4, windowHeight/2)
}



function draw(){
    //mouseX mouseY frameCount map
    background(0)

    puk.xcheck = circle.pos.x
    puk.ycheck = circle.pos.y
    puk.speedcheck = circle.vel
    puk.collide()
    puk.update()
    puk.show()

    circle.update()
    circle.show()
}



