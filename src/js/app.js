import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/custom.css';
import {histogram} from "./openCVFunctions/histogram";
import {backProjection, initBackProjection} from "./openCVFunctions/histogramBackProjection";
import {initTemplateMatching, templateMatching} from "./openCVFunctions/templateMatching";
import {camShift, initCamShift} from "./openCVFunctions/camShift";
import {initialCanvas} from "./openCVFunctions/initialCanvas";

const trackBtn = document.getElementById('trackBtn');
const refresh = document.getElementById('refreshBtn');


const readyInfo = document.getElementById('readyInfo');

const video = document.getElementById('video');
const aoi = document.getElementById('aoi');
const coloredCanvas = document.getElementById('coloredCanvas');

const videoToCanvas = document.getElementById('videoToCanvas');
const videoToCanvasCtx = videoToCanvas.getContext('2d', {willReadFrequently: true});

const histogramCanvas = document.getElementById('histogramCanvas');
const backProjectionCanvas = document.getElementById('backProjectionCanvas');
const output = document.getElementById('output');


const scale = 2;
const maxFrames = Infinity;

let counter = 0;

trackBtn.addEventListener('click', ()=>{
    video.hidden = true;
    aoi.hidden = true;
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

    await videoToCanvasCtx.drawImage(video, 0, 0, videoToCanvas.width, videoToCanvas.height);
    await histogram(videoToCanvas, histogramCanvas);
    await backProjection(videoToCanvas, backProjectionCanvas);
    //await templateMatching(videoToCanvas, output);

    await camShift(output);

    counter++;

    setTimeout(run, 1);
}

function resizeImage(scale){

    document.documentElement.style.setProperty('--width', `${video.videoWidth / scale}px`);
}

/*MAIN*/
navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(function(stream) {
        video.srcObject = stream;
        video.play();
    })

video.onloadeddata = () => {

    videoToCanvas.width  = output.width  = video.videoWidth / scale;
    videoToCanvas.height = output.height = video.videoHeight / scale;

    resizeImage(scale);

    trackBtn.disabled = false;
    video.hidden = false;

    readyInfo.setAttribute('style', 'display: flex !important; max-height: 70px; max-width: 200px; padding: 0px 0px 0px 15px');

    setTimeout(()=>{
        readyInfo.setAttribute('style', 'display: none !important;');
    },2000);

    initialCanvas(scale);
    initBackProjection(videoToCanvas);
    //initTemplateMatching(videoToCanvas, output);
}