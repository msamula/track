let video, cap, frame, hsvRoi, test;

let loaded = false;

export function initialCanvas(scale) {

    if(!loaded){
        video = document.getElementById('video');
        test = document.getElementById('coloredCanvas');

        video.height = test.width = video.videoHeight / scale;
        video.width = test.height = video.videoWidth / scale;

        loaded = true;
    }

    cap = new cv.VideoCapture(video);

    frame = new cv.Mat(video.height, video.width, cv.CV_8UC4);
    cap.read(frame);

    hsvRoi = new cv.Mat();

    cv.cvtColor(frame, hsvRoi, cv.COLOR_RGBA2RGB);
    cv.cvtColor(hsvRoi, hsvRoi, cv.COLOR_RGB2HSV);

    cv.imshow(coloredCanvas, hsvRoi);
}