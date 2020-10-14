// ------ SLICK ------ //
$(document).ready(function(){
    $('#projects').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        infinite: false,
        autoplaySpeed: 7000,
        arrows: false,
        dots: false,
        speed: 700,
        waitForAnimate: true,
    });
});

$('#projects').on('afterChange', function(event, slick, currentSlide, nextSlide){
    $slides = $('.portfolio_state > div');
    $slides.each(function (i){
        $(this).removeClass('active');
        if(i==currentSlide) $(this).addClass("active");
    });
    $('.number h1').text("0"+(currentSlide+1)+"/");
    sliding = false;
});
var portfolioSlideLen = 0;
$('#projects').on('init reInit', function(event, slick, currentSlide, nextSlide){
    portfolioSlideLen = slick.slideCount-1;
    $('.number h2').text("0"+slick.slideCount);
});

$('.up').on("click", () => {
    $('#projects').slick("slickPrev");
});
$('.down').on("click", () => {
    $('#projects').slick("slickNext");
});


// vars
const portfolio = document.querySelector("#portfolio");
var stopScroll = false;

var oldScrollYp, 
    oldScrollYn,
    scrollYp = true,
    scrollYn = true;


document.addEventListener('scroll', function () {
    var d_width = window.innerWidth,
        portfolioFixed = false;
    
    if (d_width > 768) {
        // verificar permição para fazer scroll YY(+ & -)
        scrollYn = getScrollYnPerm();
        scrollYp = getScrollYpPerm();
        portfolioFixed = getPortfolioPosFixed(); // 
        console.log(scrollYp +" "+ scrollYn);

        // verificar alteracao de permicao
        if ( scrollYp !== oldScrollYp || scrollYn !== oldScrollYn) {
            oldScrollYp = scrollYp;
            oldScrollYn = scrollYn;
            if (scrollYp == false || scrollYn == false){
                console.log(portfolioFixed);
            }
        }

        // aplicar estado do portfolio section
        // portfolio action fixed
        if ( portfolioFixed ) {
            window.scrollTo(0, portfolio.offsetTop);
            $('.header').addClass('onPortfolio');
            $(window).on('wheel', mouseWheelHandler);
        } else {
            $('.header').removeClass('onPortfolio');
            $(window).off('wheel', mouseWheelHandler);
        }
    }
});

function getScrollYpPerm() {
    var portfolioPos = portfolio.offsetTop;
    var scrollP = Math.round(window.scrollY);
    
    if (scrollP >= portfolioPos) {
        var portfolioSlickPos = $('#projects').slick('slickCurrentSlide'),
            portfolioSlickCount = $('#projects').slick('getSlick').slideCount -1;
        
        if ( portfolioSlickPos == portfolioSlickCount )
            return true;
        else return false;
    } else return true;
}
function getScrollYnPerm() {
    var portfolioPos = portfolio.offsetTop,
        scrollP = Math.round(window.scrollY);

    // verificar permicao para scrollY+ && scrollY-
    if (scrollP == portfolioPos) {
        var portfolioSlickPos = $('#projects').slick('slickCurrentSlide');

        if ( portfolioSlickPos == 0 )
            return true;
        else return false;
    } else return true;
}


var scrollPos = 0;
function getPortfolioPosFixed() {
    var currScrollPos = Math.round(window.scrollY);
    
    if (!scrollYp && !scrollYn) {
        scrollPos = currScrollPos;
        return true;
    }

    // scroll down
    if ( currScrollPos >= scrollPos && !scrollYp ){
        scrollPos = currScrollPos;
        return true; //fixed
    }
    // scroll up
    if ( currScrollPos < scrollPos && !scrollYn ) {
        scrollPos = currScrollPos;
        return true;
    }
    else { 
        scrollPos = currScrollPos;
        return false; 
    }
}


var sliding = false;
const $slider = $("#projects");

function mouseWheelHandler(event) {
	const $slider = $('#projects');
    const delta = event.originalEvent.deltaY; // normalize value of deltaY (to -1/1)
    if(sliding == false) {
        sliding = true;
        if(delta > 0) {
            $slider.slick('slickNext');
        }
        else {
            $slider.slick('slickPrev');
        }
    }
}