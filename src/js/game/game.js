let gameCanvas, ctx, canvasData, image, enemy;

function drawPixel (x, y) {

    let index = (x + y * gameCanvas.width) * 4;

    canvasData.data[index]      = 255;
    canvasData.data[index + 1]  =  34;
    canvasData.data[index + 2]  =   0;
    canvasData.data[index + 3]  = 255;
}

export function initGameCanvas(width, height){

    gameCanvas = document.getElementById('gameCanvas');

    gameCanvas.width  = 480;
    gameCanvas.height = 270;

    ctx = gameCanvas.getContext("2d", {willReadFrequently: true});

    ctx.font = "48px sans-serif";
    ctx.fillStyle = "red";

    image = new Image();
    enemy = new Image();
    //image.src = './media/auto.png';
    image.src = './media/monkey.png';
    enemy.src = './media/enemy.png';

    console.log('Initial game finished');
}

let enemyXPos;
let enemyYPos = 0;

let counter = 0;

let touched = false;

export function play( x, y, width, height){

    if(enemyYPos > gameCanvas.height && touched === false){
        counter = 0;
    }

    if(enemyYPos > gameCanvas.height){
        enemyXPos = Math.floor(Math.random() * gameCanvas.width-30) + 30;
        enemyYPos = 0;
        touched = false;
    }

    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

    ctx.fillText(`${counter}`, 10, 50);

    if(!touched){
        ctx.drawImage(enemy, enemyXPos , enemyYPos, 50, 50);
    }

    ctx.drawImage(image, x, y, 50, 50);


    if( Math.abs(enemyXPos-x) <= 30 && Math.abs(enemyYPos-y) <= 30){
        if(!touched){
            counter++;
            touched = true;
        }
    }

    if(counter > 9){
        enemyYPos++;
    }
    if(counter > 5){
        enemyYPos++;
    }
    enemyYPos++;
}