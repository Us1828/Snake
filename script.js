let mainPole = document.getElementById('mainPole')
let score = document.getElementById('eats')
const buttons = document.getElementById('buttons')
let pole = 20
let eats = 0
let gameParam = false
let players = [[1,1,'','']]
let appleArray = [1,1]

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
    players[i][3].style.transition =  '0.5s';
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
                players[i][1] -= 1
                if (players[i][0] <= 0 || players[i][0] > pole || players[i][1] <= 0 || players[i][1] > pole) {
                    dead()
                    players[i][2] = ''
                    clearInterval(inter)
                    break
                }
                players[i][3].style.transform += 'translateY(-20px)';
                checkApple()
                break;
                
            case 'S':
                players[i][1] += 1
                if (players[i][0] <= 0 || players[i][0] > pole || players[i][1] <= 0 || players[i][1] > pole) {
                    dead()
                    players[i][2] = ''
                    clearInterval(inter)
                    break
                }
                players[i][3].style.transform += 'translateY(20px)';
                checkApple()
                break;
                
            case 'D':
                players[i][0] += 1
                if (players[i][0] <= 0 || players[i][0] > pole || players[i][1] <= 0 || players[i][1] > pole) {
                    dead()
                    players[i][2] = ''
                    clearInterval(inter)
                    break
                }
                players[i][3].style.transform += 'translateX(20px)';
                checkApple()
                break;

            case 'A':
                players[i][0] -= 1
                if (players[i][0] <= 0 || players[i][0] > pole || players[i][1] <= 0 || players[i][1] > pole) {
                    dead()
                    players[i][2] = ''
                    clearInterval(inter)
                    break
                }
                players[i][3].style.transform += 'translateX(-20px)';
                checkApple()
                break
                
            default:
                break;
        }
    },250)
}

function checkApple() {
    if(appleArray[0] == players[0][0] && players[0][1] == appleArray[1]){
        appleArray[0] = getRandomInt(1,pole)
        appleArray[1] = getRandomInt(1,pole)
        let x = appleArray[0] * 20 - 20
        let xx = x + 'px'
        let y = appleArray[1] * 20 - 20
        let yy = y + 'px'
        apple.style.marginLeft = xx
        apple.style.marginTop = yy
        newPlayer()
        score.textContent++; 
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
    let a = players[0][0]
    let b = players[0][1]
    let c = players[0][2]
    players.push([a, b, c, ''])
    createPlayer(players.length-1)
}
