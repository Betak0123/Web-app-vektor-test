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
let wait = false
let starter, velx, vely
let chillBro = false
let goalBoomRed, goalBoomBlue, HitBlue, HitRed, sideHit

let collideFixer = 0
let points1 = 0
let points2 = 0

let a = false
let canvas
let startScreen, gameScreen, buttonOne, buttonTwo, blackTone, pause
let playerOneReady = false
let playerTwoReady = false
let isPlaying = false

let titleSound



function preload(){
    initSounds()
    initVars()
}

function setup(){
    console.log(pointDiv11)

    frameRate(60)
    canvas = createCanvas(windowWidth, windowHeight)
    gameScreen.child(canvas)
    background('black')   
    stroke('white')
    colorMode(HSB, 360, 100, 100, 100);
    rectMode(CENTER);

    noFill()
    stroke('yellow');
    strokeWeight(15)

    starter = random(0, 1)
    // Rød starter 
    if(starter < 0.5){
        velx = round(random(4,7))
        vely = round(random(-4,4))
    }
    // Blå starter
    if(starter > 0.5){
        velx = round(random(-4,-7))
        vely = round(random(-4,4))
    }
    puk = new Puk(windowWidth/2, windowHeight/2, velx, vely)
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
    client.subscribe('readyOne')
    client.subscribe('readyTwo')
    client.subscribe('notReadyOne')
    client.subscribe('notReadyTwo')

    socket.on('spillere', (msg) => {
        if(msg == 'readyOne'){
            buttonOne.addClass('ready')
            buttonOne.html('READY')
            console.log('Player 1 ready');
            playerOneReady = true
        }
        
        if(msg == 'notReadyOne'){
            buttonOne.removeClass('ready')
            buttonOne.html('NOT READY')
            buttonOne.child(createSpan())
            buttonOne.child(createSpan())
            buttonOne.child(createSpan())
            buttonOne.child(createSpan())

            console.log('Player 1 not ready');
            playerOneReady = false
        }

        if(msg == 'readyTwo'){
            buttonTwo.addClass('ready')
            buttonTwo.html('READY')
            playerTwoReady = true
        }

        if(msg == 'notReadyTwo'){
            buttonTwo.removeClass('ready')
            buttonTwo.html('NOT READY')
            buttonTwo.child(createSpan())
            buttonTwo.child(createSpan())
            buttonTwo.child(createSpan())
            buttonTwo.child(createSpan())
            playerTwoReady = false
        }
    })

    //Modtag beskeder
    client.on('message', (topic, message) => {
        //Betingelser
        if(topic == 'readyOne'){
            buttonOne.addClass('ready')
            buttonOne.html('READY')
            console.log('Player 1 ready');
            playerOneReady = true
        }
        
        if(topic == 'notReadyOne'){
            buttonOne.removeClass('ready')
            buttonOne.html('NOT READY')
            buttonOne.child(createSpan())
            buttonOne.child(createSpan())
            buttonOne.child(createSpan())
            buttonOne.child(createSpan())

            console.log('Player 1 not ready');
            playerOneReady = false
        }

        if(topic == 'readyTwo'){
            buttonTwo.addClass('ready')
            buttonTwo.html('READY')
            playerTwoReady = true
        }

        if(topic == 'notReadyTwo'){
            buttonTwo.removeClass('ready')
            buttonTwo.html('NOT READY')
            buttonTwo.child(createSpan())
            buttonTwo.child(createSpan())
            buttonTwo.child(createSpan())
            buttonTwo.child(createSpan())
            playerTwoReady = false
        }
    })



}



function draw(){
    if(playerOneReady && playerTwoReady){

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
            if(isPlaying){
                puk.update()
                puk.collide()
                puk.show()
            } 
        }else if(restarting && !wait){
            console.log('Yo!')
            wait = true
            setTimeout(() => {
                puk.pos = createVector(windowWidth/2, windowHeight/2)
                if(starter < 0.5){
                    velx = round(random(4,7))
                    vely = round(random(-4,4))
                }
                if(starter > 0.5){
                    velx = round(random(-4,-7))
                    vely = round(random(-4,4))
                }
                puk.vel = createVector(velx,vely)
                restarting = false
                wait = false
            }, 6000);
            setTimeout(() => {
                circleRed.pos = createVector(9*windowWidth/10, windowHeight/2)
                circleBlue.pos = createVector(windowWidth/10, windowHeight/2)
                
            }, 5000);
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

            if(isPlaying){
                // pause.html('PAUSED')
                pause.style('opacity', 0 + '%')
                pause.style('visibility', 'hidden')
                blackTone.style('opacity', 0 + '%')
                blackTone.style('visibility', 'hidden')
            }
        
    }else{
        if(isPlaying){
            pause.html('PAUSED')
            pause.style('opacity', 100 + '%')
            pause.style('visibility', 'visible')
            blackTone.style('opacity', 70 + '%')
            blackTone.style('visibility', 'visible')
        }
    }
    if(playerOneReady == true && playerTwoReady == true && !chillBro ){
        chillBro = true
        setTimeout(() => {
            startScreen.style('left', -100 + 'vw')
            music.play()
            setInterval(() => {
                music.play()
            }, 167000);
            timeshow(3)
            setTimeout(() => {
                isPlaying = true
                pause.html('GO!')
                setTimeout(() => {
                    pause.style('opacity', 0 + '%')
                    pause.style('visibility', 'hidden')
                }, 200);
            }, 3000);
        }, 500);

    }

    
}
function timeshow (time){
    if(time > 0){
        pause.html(time)
        pause.style('opacity', 100 + '%')
        pause.style('visibility', 'visible')
    }
    if(time > 0){
        setTimeout(() => {
            timeshow(time-1)
        }, 900);
    }
    // blackTone.style('opacity', 70 + '%')
    // blackTone.style('visibility', 'visible')
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
    goalBoomRed = loadSound("./assets/goalBoomRed.wav")
    goalBoomBlue = loadSound("./assets/goalBoomBlue.wav")
    HitBlue = loadSound("./assets/HitBlue.wav")
    HitRed = loadSound("./assets/HitRed.wav")
    sideHit = loadSound("./assets/sideHit.wav")

}

function initVars(){

    pointDiv11 = select('#LefT')
    pointDiv12 = select('#RigB')
    pointDiv21 = select('#LefB')
    pointDiv22 = select('#RigT')
    startScreen = select('#startScreen')
    gameScreen = select('#gameScreen')
    buttonOne = select('#buttonOne')
    buttonTwo = select('#buttonTwo')
    pause = select('#pause')
    blackTone = select('#blackTone')
}

function keyPressed(){
    if(keyCode == RIGHT_ARROW){
        client.publish('readyOne')
    }
    if(keyCode == LEFT_ARROW){
        client.publish('readyTwo')
    }
}

function keyReleased(){
    if(keyCode == RIGHT_ARROW){
        client.publish('notReadyOne')
    }
    if(keyCode == LEFT_ARROW){
        client.publish('notReadyTwo')
    }
}

function restart(){
    chillBro = false
    restarting = false
    wait = false
    collideFixer = 0
    points1 = 0
    points2 = 0
    a = false
    playerOneReady = false
    playerTwoReady = false
    isPlaying = false
}