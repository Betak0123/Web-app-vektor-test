let puk, circleRed, circleBlue, socket
let upR, downR, leftR , rightR
let upB, downB, leftB , rightB
let transTime = 60
let VandO = transTime
let VandN = transTime
let HøjN = transTime
let HøjO = transTime
let VensN = transTime
let VensO = transTime
let score1, score2, music, shock, pointDiv11, pointDiv12, pointDiv21, pointDiv22
let restarting = false

let points1 = 0
let points2 = 0



function preload(){
    initSounds()
    initVars()
}

function setup(){
    console.log(pointDiv11)

    frameRate(60)
    createCanvas(windowWidth, windowHeight)
    background('black')   
    stroke('white')
    colorMode(HSB, 360, 100, 100, 100);
    rectMode(CENTER);

    noFill()
    stroke('yellow');
    strokeWeight(15)
    puk = new Puk(windowWidth/2, windowHeight/2, score1)
    circleRed = new CircleRed(9*windowWidth/10, windowHeight/2)
    circleBlue = new CircleBlue(windowWidth/10, windowHeight/2)
    
    socket = io()

    socket.on('movement', (msg) => {
        if(msg =='DOWNR'){
            downR = true
            upR = false
        }
        if(msg == 'UPR'){
            upR = true
            downR = false
        }
        if(msg == 'LEFTR'){
            leftR = true
            rightR = false
        }
        if(msg == 'RIGHTR'){
            rightR = true
            leftR = false
        }
        if(msg == 'STOPXR'){
            leftR = false
            rightR = false
        }
        if(msg == 'STOPYR'){
            upR = false
            downR = false
        }

        if(msg =='DOWNB'){
            downB = true
            upB = false
        }
        if(msg == 'UPB'){
            upB = true
            downB = false
        }
        if(msg == 'LEFTB'){
            leftB = true
            rightB = false
        }
        if(msg == 'RIGHTB'){
            rightB = true
            leftB = false
        }
        if(msg == 'STOPXB'){
            leftB = false
            rightB = false
        }
        if(msg == 'STOPYB'){
            upB = false
            downB = false
        }
        // console.log(msg)
    })

    client = mqtt.connect('wss://mqtt.nextservices.dk')
    client.on('connect', (m) => {
        console.log('Client connected: ', m)
        console.log('You are now connected to mqtt.nextservices.dk')
    })

    //Subscribe til topics
    // client.subscribe('readyOne')

    //Modtag beskeder
    // client.on('message', (topic, message) => {
    //     //Betingelser
    //     if(topic == 'readyOne'){
    //         buttonOne.addClass('ready')
    //         buttonOne.html('READY')
    //         console.log('Player 1 ready');
    //         playerOneReady = true
    //     }
    // })



}



function draw(){
    // fill(60, 255, 255) Dette er gul fill farve
    // fill(50, 0, 255) Dette er hvid fill farve
    background(230, 50, 15)
    drawingContext.shadowOffsetX = 0;

    drawingContext.shadowColor = color('white')
    drawingContext.shadowBlur = 50;
    noFill()
    stroke(0, 0, 255, 50)
    strokeWeight(10)
    rectMode(CORNER)
    ellipse(width/2, height/2, windowHeight/2.5)
    ellipse(width, height/2, windowHeight/2.5)
    ellipse(0, height/2, windowHeight/2.5)
    // rect(width/2, windowHeight/2, 0, windowHeight/2)
    rect(width/2, 0, 0, windowHeight/2-windowHeight/5-5)
    rect(width/2, windowHeight/2+windowHeight/5+5, 0, windowHeight/2-windowHeight/5-5)
    drawingContext.shadowColor = color('white')
    
    rectMode(CENTER)

    fill('yellow')
    noStroke()
    drawingContext.shadowColor = color('yellow')

    if(VandO < transTime){
        lightShow(VandO, 'yPlus')
        VandO +=1
    }
    // Vandret op
    rect(width/2, 0, windowWidth, 25)
    lightReset()
    
    if(VandN < transTime){
        lightShow(VandN, 'yMinus')
        VandN +=1
    }
    // Vandret ned
    rect(width/2, height, windowWidth, 25)
    lightReset()
    
    rectMode(CORNER)
    if(HøjO < transTime){
        lightShow(HøjO, 'xMinus')
        HøjO +=1
    }
    // Lodret højre oppe
    rect(width-12.5, 0, 25, windowHeight/2-windowHeight/5-5)
    lightReset()   
    
    if(VensO < transTime){
        lightShow(VensO, 'xPlus')
        VensO +=1
    }
    // Lodret venstre oppe
    rect(-12.5, 0, 25, windowHeight/2-windowHeight/5-5)
    lightReset()     

    if(HøjN < transTime){
        lightShow(HøjN, 'xMinus')
        HøjN +=1
    }
    // Lodret højre nede
    rect(width-12.5, windowHeight/2+windowHeight/5+5, 25, windowHeight/2-windowHeight/5-5)
    lightReset()  

    if(VensN < transTime){
        lightShow(VensN, 'xPlus')
        VensN +=1
    }
    // Lodret venstre nede
    rect(-12.5, windowHeight/2+windowHeight/5+5, 25, windowHeight/2-windowHeight/5-5)
    lightReset()      


    fill('red')
    noStroke()

    if(!restarting){    
        puk.update()
        puk.collide()
        puk.show()
    }else{
        puk.pos.x = windowWidth/2
        puk.pos.y = windowHeight/2
        console.log('Yo!')
        setTimeout(() => {
            restarting = false
            circleRed.pos = createVector(9*windowWidth/10, windowHeight/2)
            circleBlue.pos = createVector(windowWidth/10, windowHeight/2)


        }, 6000);
    }

    circleRed.show()
    circleRed.update(downR, upR, leftR, rightR)
        puk.xcheck = circleRed.pos.x
        puk.ycheck = circleRed.pos.y
        puk.speedcheck = circleRed.vel

    circleBlue.show()
    circleBlue.update(downB, upB, leftB, rightB)
        puk.xcheckB = circleBlue.pos.x
        puk.ycheckB = circleBlue.pos.y
        puk.speedcheckB = circleBlue.vel
}

function lightShow(rect, shadow){
    fill(50 + 10/transTime*rect, 255/transTime*rect, 255)
    rect = rect+1
    if(shadow == 'yPlus'){
        drawingContext.shadowOffsetY = 25 - 25/transTime*rect;
    }
    if(shadow == 'yMinus'){
        drawingContext.shadowOffsetY = - 25 + 25/transTime*rect;
    }
    if(shadow == 'xPlus'){
        drawingContext.shadowOffsetX = 25 - 25/transTime*rect;
    }
    if(shadow == 'xMinus'){
        drawingContext.shadowOffsetX = - 25 + 25/transTime*rect;
    }
}

function lightReset(){
    fill('yellow')
    drawingContext.shadowOffsetY = 0
    drawingContext.shadowOffsetX = 0
}

function initSounds(){
    score1 = loadSound("./assets/Score1.mp3")
    score2 = loadSound("./assets/Score2.mp3")
    shock = loadSound("./assets/shock.mp3")
    music = loadSound("./assets/GameMusic.mp3")
}

function initVars(){

    pointDiv11 = select('#LefT')
    pointDiv12 = select('#RigB')
    pointDiv21 = select('#LefB')
    pointDiv22 = select('#RigT')
}

