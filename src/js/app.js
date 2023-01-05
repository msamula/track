import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/custom.css';
import {histogram} from "./openCVFunctions/histogram";
import {backProjection, initBackProjection} from "./openCVFunctions/histogramBackProjection";
import {initTemplateMatching, templateMatching} from "./openCVFunctions/templateMatching";
import {camShift, initCamShift} from "./openCVFunctions/camShift";
import {initialCanvas} from "./openCVFunctions/initialCanvas";
import {initGameCanvas, play} from "./game/game";

const trackBtn = document.getElementById('trackBtn');
const refresh = document.getElementById('refreshBtn');


const readyInfo = document.getElementById('readyInfo');

const video = document.getElementById('video');

const coloredCanvas = document.getElementById('coloredCanvas');

const videoToCanvas = document.getElementById('videoToCanvas');
const videoToCanvasCtx = videoToCanvas.getContext('2d', {willReadFrequently: true});

const histogramCanvas = document.getElementById('histogramCanvas');
const backProjectionCanvas = document.getElementById('backProjectionCanvas');
const output = document.getElementById('output');

const gameCanvas = document.getElementById('gameCanvas');


const scale = 2;
const maxFrames = Infinity;

let initialCanvasInterval;

let counter = 0;

trackBtn.addEventListener('click', ()=>{
    video.hidden = true;
    coloredCanvas.hidden = true;
    refresh.hidden = true;
    initCamShift(scale);
    run();
});

refresh.addEventListener('click', ()=>{
    initialCanvas(scale);
});

document.getElementById('restartBtn').addEventListener('click',()=>{
    location.reload();
});

async function run(){

    if(counter > 0){
        trackBtn.disabled = true;
    }

    if(counter === maxFrames){
        counter = 0;
        trackBtn.disabled = false;
        return;
    }

    clearInterval(initialCanvasInterval);

    await videoToCanvasCtx.drawImage(video, 0, 0, videoToCanvas.width, videoToCanvas.height);
    await histogram(videoToCanvas, histogramCanvas);
    await backProjection(videoToCanvas, backProjectionCanvas);
    //await templateMatching(videoToCanvas, output);

    let [center, size] = await camShift(output);

    await play((center.x).toFixed(0), (center.y).toFixed(0), (size.width).toFixed(0), (size.height).toFixed(0));

    counter++;

    setTimeout(run, 1);
}

function resizeImage(scale){

    document.documentElement.style.setProperty('--width', `${video.videoWidth / scale}px`);
}

function initialOpenCV(){
    setTimeout(()=>{

        initBackProjection(videoToCanvas);

        initGameCanvas(gameCanvas.width, gameCanvas.height);

        //initTemplateMatching(videoToCanvas, output);

        readyInfo.setAttribute('style', 'display: flex !important; max-height: 70px; max-width: 200px; padding: 0px 0px 0px 15px');

        initialCanvasInterval = setInterval(()=>{

            initialCanvas(scale);
        },84);

        setTimeout(()=>{
            readyInfo.setAttribute('style', 'display: none !important;');
        },2000);

    },700);
}

/*MAIN*/
navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(function(stream) {
        video.srcObject = stream;
        video.play();
    })

video.onloadeddata = () => {

    gameCanvas.width = videoToCanvas.width  = output.width  = video.videoWidth / scale;
    gameCanvas.height = videoToCanvas.height = output.height = video.videoHeight / scale;

    resizeImage(scale);

    trackBtn.disabled = false;
    video.hidden = false;

    initialOpenCV();
}