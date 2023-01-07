import {colorPicker} from "../helper/colorPicker";

let video, cap, frame, hsvRoi, coloredCanvas, initialized = false;

let rectPoints, textPosition;

const thickness = 1;
const color = [0, 255, 0, 255];
const textColor = [255, 0, 0, 255];
const fontSize = 0.5;


/*BLUR*/
let ksize;
let anchor;


export function initialCanvas(scale, rectWidthHeight) {

    if(!initialized){

        video = document.getElementById('video');
        coloredCanvas = document.getElementById('coloredCanvas');

        let height = video.height = coloredCanvas.height = video.videoHeight / scale;
        let width = video.width  = coloredCanvas.width = video.videoWidth / scale;

        rectPoints = [
            {
                x: width/2 - rectWidthHeight/2, y: height/2-rectWidthHeight/2
            },
            {
                x: width/2 + rectWidthHeight/2, y: height/2-rectWidthHeight/2
            },
            {
                x: width/2 + rectWidthHeight/2, y: height/2+rectWidthHeight/2
            },
            {
                x: width/2 - rectWidthHeight/2, y: height/2+rectWidthHeight/2
            },
        ]

        textPosition = {
            x: width/2-20, y: height/2+50
        }

        cap = new cv.VideoCapture(video);
        frame = new cv.Mat(video.height, video.width, cv.CV_8UC4);

        ksize = new cv.Size(4, 4);
        anchor = new cv.Point(-1,-1);

        initialized = true;
    }

    cap.read(frame);

    hsvRoi = new cv.Mat();

    cv.cvtColor(frame, hsvRoi, cv.COLOR_RGBA2RGB);
    cv.cvtColor(hsvRoi, hsvRoi, cv.COLOR_RGB2HSV);

    colorPicker(coloredCanvas, 0, 0);

    cv.line(hsvRoi, rectPoints[0], rectPoints[1], color, thickness);
    cv.line(hsvRoi, rectPoints[1], rectPoints[2], color, thickness);
    cv.line(hsvRoi, rectPoints[2], rectPoints[3], color, thickness);
    cv.line(hsvRoi, rectPoints[3], rectPoints[0], color, thickness);
    cv.line(hsvRoi, rectPoints[0], rectPoints[2], color, thickness);
    cv.line(hsvRoi, rectPoints[3], rectPoints[1], color, thickness);

    cv.putText(hsvRoi, 'object', textPosition, cv.FONT_HERSHEY_SIMPLEX , fontSize, textColor, thickness, cv.LINE_AA);

    //cv.blur(hsvRoi, hsvRoi, ksize, anchor, cv.BORDER_DEFAULT);

    cv.imshow(coloredCanvas, hsvRoi);

    hsvRoi.delete();

    return rectPoints[0];
}