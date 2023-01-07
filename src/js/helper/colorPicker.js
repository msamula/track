function drawPixel (canvasData, x, y, imgWidth) {

    let index = (x + y * imgWidth) * 4;

    console.log(canvasData.data[index],canvasData.data[index+1],canvasData.data[index+2]);

}

export function colorPicker(canvas, x, y) {

    let ctx = canvas.getContext('2d', { willReadFrequently: true });

    let canvasData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    drawPixel(canvasData, x, y, canvas.width);
}