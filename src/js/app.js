import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/custom.css';
import {histogram} from "./openCVFunctions/histogram";
import {camShift} from "./openCVFunctions/camShift";

const histBtn = document.getElementById('histBtn');
histBtn.addEventListener('click', updateHistogram);

const video = document.getElementById('video');

const videoToCanvas = document.getElementById('videoToCanvas');
const videoToCanvasCtx = videoToCanvas.getContext('2d', {willReadFrequently: true});

const histogramCanvas = document.getElementById('histogramCanvas');


const scale = 2;
const maxFrames = 2000;

let counter = 0;


async function updateHistogram(){

    if(counter > 0){
        histBtn.disabled = true;
    }

    if(counter === maxFrames){
        counter = 0;
        histBtn.disabled = false;
        return;
    }

    await videoToCanvasCtx.drawImage(video, 0, 0, videoToCanvas.width, videoToCanvas.height);
    await histogram(videoToCanvas, histogramCanvas);

    counter++;

    setTimeout(updateHistogram, 1);
}

navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(function(stream) {
        video.srcObject = stream;
        video.play();
    })

video.onloadeddata = () => {

    videoToCanvas.width = video.videoWidth / scale;
    videoToCanvas.height = video.videoHeight / scale;

    histBtn.disabled = false;

}