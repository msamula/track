function resizeImage(width, height){
    document.documentElement.style.setProperty('--width', `${width}px`);
    document.documentElement.style.setProperty('--width', `${height}px`);
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
    resizeImage(getWindowWidth(),getWindowHeight());
}