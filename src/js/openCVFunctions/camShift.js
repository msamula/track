let video, cap, frame, trackWindow, trackBox, dst, roiHist, termCrit, hsv, hsvVec;

export function initCamShift(scale){
    video = document.getElementById('video');

    video.height = video.videoHeight/scale;
    video.width  = video.videoWidth/scale;

    cap = new cv.VideoCapture(video);


// take first frame of the video
    frame = new cv.Mat(video.height, video.width, cv.CV_8UC4);
    cap.read(frame);



// hardcode the initial location of window
    trackWindow = new cv.Rect(0, 0, 100, 100);

// set up the ROI for tracking
    let roi = frame.roi(trackWindow);
    let hsvRoi = new cv.Mat();

/*
    video = document.getElementById('video');

    video.height = video.videoHeight/scale;
    video.width  = video.videoWidth/scale;

    cap = new cv.VideoCapture(video);

    frame = new cv.Mat(video.height, video.width, cv.CV_8UC4);
    cap.read(frame);

    let hsvRoi = new cv.Mat();

    cv.cvtColor(frame, hsvRoi, cv.COLOR_RGBA2RGB);
    cv.cvtColor(hsvRoi, hsvRoi, cv.COLOR_RGB2HSV);

    let test = document.getElementById('test');
    test.width = video.width;
    test.height = video.height;

    cv.imshow(test, hsvRoi);
*/

    cv.cvtColor(roi, hsvRoi, cv.COLOR_RGBA2RGB);
    cv.cvtColor(hsvRoi, hsvRoi, cv.COLOR_RGB2HSV);


    let mask = new cv.Mat();
    let lowScalar = new cv.Scalar(30, 30, 0);
    let highScalar = new cv.Scalar(180, 180, 180);
    let low = new cv.Mat(hsvRoi.rows, hsvRoi.cols, hsvRoi.type(), lowScalar);
    let high = new cv.Mat(hsvRoi.rows, hsvRoi.cols, hsvRoi.type(), highScalar);

    cv.inRange(hsvRoi, low, high, mask);

    roiHist = new cv.Mat();

    let hsvRoiVec = new cv.MatVector();
    hsvRoiVec.push_back(hsvRoi);

    cv.calcHist(hsvRoiVec, [0], mask, roiHist, [180], [0, 180]);
    cv.normalize(roiHist, roiHist, 0, 255, cv.NORM_MINMAX);

// delete useless mats.
    roi.delete(); hsvRoi.delete(); mask.delete(); low.delete(); high.delete(); hsvRoiVec.delete();

// Setup the termination criteria, either 10 iteration or move by at least 1 pt
    termCrit = new cv.TermCriteria(cv.TERM_CRITERIA_EPS | cv.TERM_CRITERIA_COUNT, 10, 1);

    hsv = new cv.Mat(video.height, video.width, cv.CV_8UC3);
    hsvVec = new cv.MatVector();
    hsvVec.push_back(hsv);
    dst = new cv.Mat();
    trackBox = null;

    console.log('Initial CamShift finished');
}



export function camShift(output) {

     cap.read(frame);
     cv.cvtColor(frame, hsv, cv.COLOR_RGBA2RGB);
     cv.cvtColor(hsv, hsv, cv.COLOR_RGB2HSV);

     cv.calcBackProject(hsvVec, [0], roiHist, dst, [0, 180], 1);

     [trackBox, trackWindow] = cv.CamShift(dst, trackWindow, termCrit);

     let pts = cv.rotatedRectPoints(trackBox);
     cv.line(frame, pts[0], pts[1], [255, 0, 0, 255], 3);
     cv.line(frame, pts[1], pts[2], [255, 0, 0, 255], 3);
     cv.line(frame, pts[2], pts[3], [255, 0, 0, 255], 3);
     cv.line(frame, pts[3], pts[0], [255, 0, 0, 255], 3);
     cv.imshow(output, frame);
}
