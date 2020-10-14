//global vars
var myIndex = 0,
    carroucel_timeOut;
const nums = document.getElementsByClassName("num"),
    _times = document.getElementsByClassName("time");


function carrousel(_index, onSwipe = false) {
    if (_index || _index == 0) {
        myIndex = _index; //manual carrousel
    }

    for ( var i = 0; i < nums.length; i++ ) {
        var num = nums[i],
            _time = _times[i];
        num.classList.remove("active");
        _time.classList.remove("stop");
    }

    nums[myIndex].classList.add("active");
    !onSwipe && (
        myIndex === 0
        ? $('#carrousel').slick('slickNext')
        : $('#carrousel').slick('slickGoTo', myIndex)
    );

    myIndex ++;
    if(myIndex > 3 ) myIndex = 0;
    
    carroucel_timeOut = setTimeout(carrousel, 7000);
}

function pauseCarrousel() {
    clearTimeout(carroucel_timeOut);
    for ( var i = 0; i < _times.length; i++ ) {
        var _time = _times[i];
        _time.classList.add("stop");
    }
}

function continueCarrousel() {
    clearTimeout(carroucel_timeOut);
    if ( myIndex == 0) myIndex = 4;
    myIndex -= 1;
    if ( myIndex < 0) myIndex = 0;
    carrousel(myIndex, true);
}

function interactCarrousel(index) {
    $('#carrousel').slick('slickGoTo', index);
    
    clearTimeout(carroucel_timeOut);
    carrousel(index);
}


// ------ SLICK ------ //
$(document).ready(initSlick());

$('#carrousel').on('swipe', function(event, slick, direction) {
    clearTimeout(carroucel_timeOut);
    carrousel(slick.currentSlide, true);
});
$('#carrousel').on('edge', function(event, slick, direction){
    clearTimeout(carroucel_timeOut);
    carrousel(slick.currentSlide, true);
});

function initSlick() {
    $('#carrousel').slick({
        slidesToShow: 1,
        autoplay: false,
        autoplaySpeed: 7000,
        pauseOnHover: true,
        arrows: false,
        speed: 700,
        waitForAnimate: true,
        infinite: true,
        responsive : [
            {
                breakpoint: 768,
                settings: { swipe: false }
            }
        ]
    });

    clearTimeout(carroucel_timeOut);
    carrousel(0, true);
}

['load', 'resize'].forEach( evt => window.addEventListener(evt, ()=> {
    const w = window.innerWidth; 
    
    w < 768 
    ? $('#carrousel').slick('unslick')
    : initSlick();
}));