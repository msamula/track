    let imageToCanvas, templ;

export function initTemplateMatching(){

    imageToCanvas = document.getElementById('imageToCanvas');
    let imageToCanvasCtx = imageToCanvas.getContext('2d', {willReadFrequently: true});

    let img = new Image();
    img.src = 'media/me3.jpg';

    img.onload = function() {
        imageToCanvas.width = img.width;
        imageToCanvas.height = img.height;
        imageToCanvasCtx.drawImage(img, 0, 0, img.width, img.height);

        templ = cv.imread(imageToCanvas);

        console.log('Initial Template Matching finished');
    };
}

export function templateMatching(input, output){

    let src = cv.imread(input);

    let dst = new cv.Mat();
    let mask = new cv.Mat();

    cv.matchTemplate(src, templ, dst, cv.TM_CCOEFF, mask);

    let result = cv.minMaxLoc(dst, mask);
    let maxPoint = result.maxLoc;

    let color = new cv.Scalar(255, 0, 0, 255);
    let point = new cv.Point(maxPoint.x + templ.cols, maxPoint.y + templ.rows);

    cv.rectangle(src, maxPoint, point, color, 2, cv.LINE_8, 0);

    cv.imshow(output, src);
}

