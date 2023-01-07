function changeCSS(width, height, scale){
    document.documentElement.style.setProperty('--width', `${width}px`);
    document.documentElement.style.setProperty('--height', `${height}px`);

    document.documentElement.style.setProperty('--scale', `${scale}`);
}

function getWindowWidth() {
    return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
}

function getWindowHeight() {
    return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.documentElement.clientHeight
    );
}

export function cssRoot(){
    let video = document.getElementById('video');

    let windowWidth = getWindowWidth();
    let windowHeight = getWindowHeight();

    let scale = (windowHeight * 0.6) / video.videoHeight;

    changeCSS(windowWidth,windowHeight, scale);
}