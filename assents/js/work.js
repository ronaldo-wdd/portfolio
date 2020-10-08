const bg = document.querySelector("div.d"),
    _viewPort = window.innerHeight,   
    work = document.querySelector(".work"),
    img = new Image();
let workBottom;

img.onload = () => workBottom = work.offsetTop + work.offsetHeight - bg.offsetHeight - 18;
img.src = work.querySelector('img').src;

window.addEventListener("scroll", function(){
    let scrollPosition = Math.round(window.scrollY);

    if ( scrollPosition >= _viewPort ) {
        if ( scrollPosition >= workBottom ) {
            bg.style.position = "absolute";
            bg.style.top = workBottom + "px";
        }
        else { 
            bg.style.position = "fixed";
            bg.style.top = "0px";
        }
    } else bg.style.position = "relative";
});