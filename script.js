let mainPole = document.getElementById('mainPole')
let score = document.getElementById('eats')
const buttons = document.getElementById('buttons')
let cheat = document.getElementById('cheat')
let pole = 20
let eats = 0
let gameParam = false
let players = [[1,1,'','']]
let appleArray = [1,1]
let isDead = false

document.addEventListener('keydown',(event)=>{
    if(event.code == 'Space' && gameParam == false){
        document.getElementById('Space').style.display = 'none';
        gameParam = true
        game()
    }
},true)

function game() {
    for (let i = 0; i < 1; i++) {
        move(i)
    }
}

window.addEventListener('load',()=>{
    createPlayer(0)
    createApple()
    createPole()
    scoreNum()
},true)

function createPlayer(i) {
    let x = players[i][0] * 20 - 20
    let xx = x + 'px'
    let y = players[i][1] * 20 - 20
    let yy = y + 'px'
    players[i][3] = document.createElement('div');
    players[i][3].style.backgroundColor = 'lightgreen';
    players[i][3].style.position = 'absolute';
    players[i][3].style.width = '20px';
    players[i][3].style.height = '20px';
    players[i][3].style.transition =  '0.3s';
    players[i][3].style.marginLeft = xx
    players[i][3].style.marginTop = yy
    if (i == 0) {
        mainPole.prepend(players[i][3]);
    }
    else {
        players[0][3].after(players[i][3]);
    }
}

function createApple() {
    appleArray[0] = getRandomInt(1,pole+1)
    appleArray[1] = getRandomInt(1,pole+1)
    let x = appleArray[0] * 20 - 20
    let xx = x + 'px'
    let y = appleArray[1] * 20 - 20
    let yy = y + 'px'
    apple = document.createElement('div')
    apple.style.backgroundColor = 'red';
    apple.style.position = 'absolute';
    apple.style.height = '20px';
    apple.style.width ='20px';
    apple.style.marginLeft = xx
    apple.style.marginTop = yy
    mainPole.prepend(apple)
}

function createPole() {
    let topOne = 0
    let topTwo = topOne + 'px'
    for (let i = 1; i <= pole; i++) {
        let leftOne = 0
        let leftTwo = leftOne + 'px'
        for (let c = 1; c <= pole; c++) {
            let div = document.createElement('div')
            div.style.width = '20px'
            div.style.height = '20px'
            div.style.backgroundColor = 'green';
            div.style.position = 'absolute'
            div.style.marginLeft = leftTwo
            div.style.marginTop = topTwo
            mainPole.prepend(div)
            leftOne += 20
            leftTwo = leftOne + 'px'
        }
        topOne += 20
        topTwo = topOne + 'px'
    }
}

function scoreNum() {
    if (eats > 999999) {
        eats = 0;
    }
    score.textContent = eats
}

function move(i) {
    document.addEventListener('keydown',(event)=>{
        if(event.code == 'KeyW'){
            if(players[i][2] != 'S'){
                players[i][2] = 'W';
            }
        }
        if(event.code == 'KeyS'){
            if(players[i][2] !='W'){
                players[i][2] = 'S';
            }
        }
        if(event.code == 'KeyD'){
            if(players[i][2] != 'A'){
                players[i][2] = 'D'
            }
        }
        if(event.code == 'KeyA'){
            if(players[i][2] != 'D'){
                players[i][2] = 'A';
            }
        }
    }, true)
    let inter = setInterval(function(){
        switch (players[i][2]) {
            case 'W':
                isDead = moveSwitch('translateY(-20px)', -1, 1)
                if (isDead == true) {
                    clearInterval(inter)
                }
                break
                
            case 'S':
                isDead = moveSwitch('translateY(20px)', +1, 1)
                if (isDead == true) {
                    clearInterval(inter)
                }
                break
                
            case 'D':
                isDead = moveSwitch('translateX(20px)', +1, 0)
                if (isDead == true) {
                    clearInterval(inter)
                }
                break

            case 'A':
                isDead = moveSwitch('translateX(-20px)', -1, 0)
                if (isDead == true) {
                    clearInterval(inter)
                }
                break
                
            default:
                break;
        }
    },200)
}

function moveSwitch(trans, coord, XorY) {
    players[0][XorY] = players[0][XorY] + coord
    if (players[0][0] <= 0 || players[0][0] > pole || players[0][1] <= 0 || players[0][1] > pole) {
        dead()
        players[0][2] = ''
        return true
    }
    players[0][3].style.transform += trans;
    movePlayers(coord)
    if (checkPlayer() == true) {
        dead()
        players[0][2] = ''
        return true
    }
    checkApple()
}

function checkPlayer() {
    for (let i = 1; i < players.length; i++) {
        if (players[i][0] == players[0][0] && players[i][1] == players[0][1]) {
            return true
        }
    }
}

function movePlayers() {
    for (let i = players.length-1; i > 0; i--) {
        let XorY = ''
        let trans = ''
        let coord = 0
        if (players[i][2] == 'W'){
            XorY = 1
            coord += -1
            trans = 'translateY(-20px)'
        }
        if (players[i][2] == 'S'){
            XorY = 1
            coord += 1
            trans = 'translateY(20px)'
        }
        if (players[i][2] == 'D'){
            XorY = 0
            coord += 1
            trans = 'translateX(20px)'
        }
        if (players[i][2] == 'A'){
            XorY = 0
            coord += -1
            trans = 'translateX(-20px)'
        }

        players[i][2] = players[i-1][2]
        players[i][XorY] = players[i][XorY] + coord
        players[i][3].style.transform += trans;
        
    }
}

function checkApple() {
    if(appleArray[0] == players[0][0] && players[0][1] == appleArray[1]){
        appleArray[0] = getRandomInt(1,pole+1)
        appleArray[1] = getRandomInt(1,pole+1)
        let x = appleArray[0] * 20 - 20
        let xx = x + 'px'
        let y = appleArray[1] * 20 - 20
        let yy = y + 'px'
        apple.style.marginLeft = xx
        apple.style.marginTop = yy
        newPlayer()
        score.textContent = players.length-1
    }   
}

function dead() {
    gameParam = false
    const dead = document.createElement('div')
    dead.classList = 'dead'
    dead.style.display = 'block'
    dead.textContent = 'Game Over'
    dead.style.position = 'absolute'
    mainPole.prepend(dead)
    mainPole.textContent = 'Game Over'
    mainPole.style.color = 'white'
    score.style.display = 'none'
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

buttons.addEventListener('click',(event=>{
    if(event.target.closest('#cheat')){
        for (let i = 1; i <= 10; i++) {
            newPlayer()
        }
        score.textContent = players.length-1
    }
    if(event.target.closest('#Space')){
        if(gameParam == false){
            document.getElementById('Space').style.display = 'none';
            gameParam = true
            game()
        }
    }
    if(event.target.closest('#Left')){
        if(players[0][2] != 'D'){
            players[0][2] = 'A';
        }
    }
    if(event.target.closest('#Right')){
        if(players[0][2] != 'A'){
            players[0][2] = 'D'
        }
    }
    if(event.target.closest('#Down')){
        if(players[0][2] !='W'){
            players[0][2] = 'S';
        }
    }
    if(event.target.closest('#Top')){
        if(players[0][2] != 'S'){
            players[0][2] = 'W';
        }
    }
}))

function newPlayer() {
    let c = players[players.length-1][2]
    let a = players[players.length-1][0]
    let b = players[players.length-1][1]
    if (c == 'W') {
        b += 1
    }
    if (c == 'S') {
        b += -1
    }
    if (c == 'D') {
        a += -1
    }
    if (c == 'A') {
        a += 1
    }
    players.push([a, b, c, ''])
    createPlayer(players.length-1)
}
