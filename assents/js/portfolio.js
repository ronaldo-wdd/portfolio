// ------ SLICK ------ //
$(document).ready(function(){
    $('#projects').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        infinite: false,
        // autoplay: true,
        autoplaySpeed: 7000,
        // pauseOnHover: false,
        arrows: false,
        dots: false,
        // fade: true,
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
            if (scrollYp == false || scrollYn == false){ // se scrollPos >= PortfolioH
                // console.log(scrollYp+", "+ scrollYn);
                console.log(portfolioFixed);
            }
        }

        // aplicar estado do portfolio section
        // portfolio action fixed
        if ( portfolioFixed ) {
            window.scrollTo(0, portfolio.offsetTop);
            $('.header').addClass('onPortfolio');
            $(window).on('wheel', mouseWheelHandler); // portfolioSlide();
            // console.log("fixed: " + scrollYp +", "+ scrollYn);
        } else {
            $('.header').removeClass('onPortfolio');
            $(window).off('wheel', mouseWheelHandler);
        }
    }
});

function getScrollYpPerm() {
    var portfolioPos = portfolio.offsetTop;
    var scrollP = Math.round(window.scrollY);
    
    // verificar permicao para scrollY+ && scrollY-
    // if (scrollP >= portfolioPos && scrollP <= (portfolioPos+portfolioH)) {
    if (scrollP >= portfolioPos) {
        var portfolioSlickPos = $('#projects').slick('slickCurrentSlide'),
            portfolioSlickCount = $('#projects').slick('getSlick').slideCount -1;
        
        if ( portfolioSlickPos == portfolioSlickCount )
            return true;
        else return false;

        // if ( portfolioSlickPos <= portfolioSlickCount ) 
        //     return true;
        // else return false;
    } else return true;
}
function getScrollYnPerm() {
    var portfolioPos = portfolio.offsetTop,
        scrollP = Math.round(window.scrollY);

    // console.log("scrollP: "+scrollP + " portfolioPos: "+ portfolioPos);

    // verificar permicao para scrollY+ && scrollY-
    if (scrollP == portfolioPos) {
        var portfolioSlickPos = $('#projects').slick('slickCurrentSlide');
        // console.log("Slick currPos: "+ portfolioSlickPos);

        if ( portfolioSlickPos == 0 )
            return true;
        else return false;
    } else return true;
}


var scrollPos = 0;
function getPortfolioPosFixed() {
    // var currScrollPos = document.body.getBoundingClientRect().top;
    var currScrollPos = Math.round(window.scrollY);

    // var dir = scrollDir(currScrollPos);

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
        // console.log("ups :( -> scrollYp: " + scrollYp + ", scrollYn: " + scrollYn);
        // console.log("currScrollPos: " + currScrollPos + ", scrollPos: " + scrollPos);
        scrollPos = currScrollPos;
        return false; 
    }
}

function scrollDir(currScrollPos) {
    if(currScrollPos > scrollPos ) { 
        scrollPos = currScrollPos;
        console.log("down");
        return "down";
    } 
    else { 
        scrollPos = currScrollPos; 
        console.log("up");
        return "up"; 
    } 
}; 

var sliding = false;
const $slider = $("#projects");
/*function portfolioSlide() {
    $(window).on('wheel', mouseWheelHandler);
    // window.addEventListener("scroll", function(event){
    //     event.preventDefault;
    // });
}*/

function mouseWheelHandler(event) {
	// event.preventDefault();
	// const $slider = event.data.$slider;
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