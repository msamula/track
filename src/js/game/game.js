let gameCanvas, ctx, image, enemy;

let enemyXPos;
let enemyYPos = 0;

let maxFruits = 5;
let counter = 0;
let touched = false;

export function initGameCanvas(){

    gameCanvas = document.getElementById('gameCanvas');

    ctx = gameCanvas.getContext("2d", {willReadFrequently: true});

    ctx.font = "30px sans-serif";
    ctx.fillStyle = "red";

    image = new Image();
    enemy = new Image();

    image.src = './media/monkey.png';

    console.log('Initial game finished');
}



export function play( x, y){

    if(enemyYPos > gameCanvas.height && touched === false){
        counter = 0;
    }

    if(enemyYPos > gameCanvas.height){

        enemy.src = `./media/${Math.floor(Math.random() * (maxFruits - 1 + 1) + 1)}.png`;
        enemyXPos = Math.floor(Math.random() * gameCanvas.width-30) + 30;
        enemyYPos = 0;
        touched = false;
    }

    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

    ctx.fillText(`${counter}`, 5, 30);

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
    enemyYPos+=3;
}