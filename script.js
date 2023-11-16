let mainPole = document.getElementById('mainPole')
let score = document.getElementById('eats')
let pole = 20
let eats = 0
let gameParam = false
let players = [[1,1,'']]

document.addEventListener('keydown',(event)=>{
    if(event.code == 'Space' && gameParam == false){
        game()
        gameParam = true
    }
},true)

function game() {
    for (let i = 0; i < players.length; i++) {
        move(i)
    }
}

document.addEventListener('load',()=>{
    createPlayer()
    createApple()    
    createPole()  
    scoreNum()    
},true)

function createPlayer() {
    player = document.createElement('div');
    player.style.backgroundColor = 'lightgreen';
    player.style.width = '20px';
    player.style.height = '20px';
    player.style.transition =  '0.5s';
    player.style.position = 'absolute';
    player.style.marginLeft = '0px'
    player.style.marginTop = '0px'
    mainPole.prepend(player);
}

function createApple() {
    apple = document.createElement('div')
    apple.style.backgroundColor = 'red';
    apple.style.position = 'absolute';
    apple.style.height = '20px';
    apple.style.width ='20px';
    apple.style.marginLeft = '0px'
    apple.style.marginTop = '0px'
    mainPole.prepend(apple)
}

function createPole() {
    let topOne = 0
    let topTwo = topOne + 'px'
    for (let i = 0; i < pole; i++) {
        let leftOne = 0
        let leftTwo = leftOne + 'px'
        for (let c = 0; c < pole; c++) {
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
    setInterval(function(){
        console.log(players[i][0],players[i][1]);
        if (players[i][0] <= 0 || players[i][0] > pole || players[i][1] <= 0 || players[i][1] > pole) {
            console.log('loose');
        }
        switch (players[i][2]) {
            case 'W':
                players[i][1] -= 1
                player.style.transform += 'translateY(-20px)';
                checkApple()
                break;
                
            case 'S':
                players[i][1] += 1
                player.style.transform += 'translateY(20px)';
                checkApple()
                break;
                
            case 'D':
                players[i][0] += 1
                player.style.transform += 'translateX(20px)';
                checkApple()
                break;

            case 'A':
                players[i][0] -= 1
                player.style.transform += 'translateX(-20px)';
                checkApple()
                break;   
                
            default:
                break;
        }
    },250)
}

function checkApple() {

}