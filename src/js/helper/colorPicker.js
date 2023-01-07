export function rgbaColorPicker(canvas, x, y) {

    let ctx = canvas.getContext('2d', { willReadFrequently: true });
    let canvasData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let index = (x + y * canvas.width) * 4;

    return [canvasData.data[index],canvasData.data[index+1],canvasData.data[index+2],canvasData.data[index+3]];
}