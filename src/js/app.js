import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/custom.css';
//import {histogram} from "./openCVFunctions/histogram";
//import {backProjection, initBackProjection} from "./openCVFunctions/histogramBackProjection";
//import {initTemplateMatching, templateMatching} from "./openCVFunctions/templateMatching";
import {camShift, initCamShift} from "./openCVFunctions/camShift";
import {initialCanvas} from "./openCVFunctions/initialCanvas";
import {initGameCanvas, play} from "./game/game";
import {cssRoot} from "./helper/rootCSS";

/*BUTTON EVENTS*/
const trackBtn = document.getElementById('trackBtn');

document.getElementById('restartBtn').addEventListener('click',()=>{
    location.reload();
});

/*DIVERSE*/
const video = document.getElementById('video');

/*CANVAS ELEMENTS*/

const coloredCanvas = document.getElementById('coloredCanvas');
const videoToCanvas = document.getElementById('videoToCanvas');

//const histogramCanvas = document.getElementById('histogramCanvas');
//const backProjectionCanvas = document.getElementById('backProjectionCanvas');

const output = document.getElementById('output');
const gameCanvas = document.getElementById('gameCanvas');

const videoToCanvasCtx = videoToCanvas.getContext('2d', {willReadFrequently: true});

/*SETTINGS*/

const scale = 1;
const maxFrames = Infinity;
let frameCounter = 0;
const rectWidthHeight = 120;
let rectPoints;
let rgba;
let initialCanvasInterval;

trackBtn.addEventListener('click', ()=>{

    video.hidden            = true;
    //videoToCanvas.hidden    = true;
    coloredCanvas.hidden    = true;
    gameCanvas.hidden       = false;

    trackBtn.disabled       = true;

    clearInterval(initialCanvasInterval);

    initCamShift(scale, rectPoints, rectWidthHeight, rgba);

    run();
});


async function run(){

    if(frameCounter === maxFrames){
        frameCounter = 0;
        trackBtn.disabled = false;
        return;
    }

    /*OPENCV FUNCTIONS*/
    //await videoToCanvasCtx.drawImage(video, 0, 0, videoToCanvas.width, videoToCanvas.height);
    //await histogram(videoToCanvas, histogramCanvas);
    //await backProjection(videoToCanvas, backProjectionCanvas);
    //await templateMatching(videoToCanvas, output);

    let center = await camShift(output);

    await play((center.x).toFixed(0), (center.y).toFixed(0));

    frameCounter++;

    setTimeout(run,1);
}




function initialOpenCV(){

    initGameCanvas();

    //initBackProjection(videoToCanvas);
    //initTemplateMatching(videoToCanvas, output);

    initialCanvasInterval = setInterval(()=>{
        [rectPoints, rgba] = initialCanvas(scale, rectWidthHeight);
    },33.33);
}

function main(){

    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(function(stream) {
            video.srcObject = stream;
            video.play();
        })

    video.onloadeddata = () => {

        gameCanvas.width  = videoToCanvas.width  = output.width  = video.videoWidth / scale;
        gameCanvas.height = videoToCanvas.height = output.height = video.videoHeight / scale;

        cssRoot(),

        trackBtn.disabled = false;

        initialOpenCV();
    }
}


document.getElementById('openCV').onload = main;


