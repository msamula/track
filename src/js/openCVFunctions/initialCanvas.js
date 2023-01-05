let video, cap, frame, hsvRoi, test;

let pts = [
    {
        x: 0,
        y: 0
    },
    {
        x: 100,
        y: 0
    },
    {
        x: 100,
        y: 100
    },
    {
        x: 0,
        y: 100
    }
];

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
    //cv.cvtColor(hsvRoi, hsvRoi, cv.COLOR_RGB2HLS);

    cv.line(hsvRoi, pts[0], pts[1], [0, 255, 0, 255], 1);
    cv.line(hsvRoi, pts[1], pts[2], [0, 255, 0, 255], 1);
    cv.line(hsvRoi, pts[2], pts[3], [0, 255, 0, 255], 1);
    cv.line(hsvRoi, pts[3], pts[0], [0, 255, 0, 255], 1);
    cv.line(hsvRoi, pts[0], pts[2], [0, 255, 0, 50], 1);
    cv.line(hsvRoi, pts[3], pts[1], [0, 255, 0, 50], 1);

    let pt = {
        x: 30,
        y: 60
    };

    cv.putText(hsvRoi, 'object', pt, cv.FONT_HERSHEY_SIMPLEX , 0.5, [0, 255, 0, 255], 1, cv.LINE_AA);
    cv.imshow(coloredCanvas, hsvRoi);
}