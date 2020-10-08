// ---- jQuery ----
// --- GLOBAL ---

$(document).ready(function () {
    $(document).on("scroll", currSection);
    
    /*smoothscroll
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");
      
        /*$('a').each(function () {
            $(this).removeClass('active');
        })
        $(this).addClass('active');*-/

        var target = this.hash,
        //menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top+2
        }, /*500,*-/ 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", currSection);
        });
    });*/
});


function currSection() {
    var scrollPos = $(document).scrollTop();
    
    $('.section_state a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos+50 && refElement.position().top + refElement.height() > scrollPos) {
            $('.section_state a').removeClass("active");
            currLink.addClass("active");
        } else {
            currLink.removeClass("active");
        }
    });
}


// --- HEADER ---
// -- menu --
$( ".burguer" ).click(function() {
    $(this).toggleClass("openMenu");
    $(".nav_mobile").toggleClass("active");
    $("#bg_blur").toggleClass("active");
});
$( "#bg_blur" ).click(function() {
    $(this).toggleClass("active");
    $(".nav_mobile").toggleClass("active");
    $(".burguer").toggleClass("openMenu");
});
// close nav_mobile 
$( ".nav_mobile ul li" ).click(function() {
    $(".nav_mobile").removeClass("active");
    $(".burguer").removeClass("openMenu");
    $("#bg_blur").toggleClass("active");
});

$(document).off("scroll");


// --- HOME ---
// -- perfil opacity --
function perfilOpacity() {
    // Detect scroll position
    let scrollPosition = Math.round(window.scrollY);
    var _viewPort = window.innerHeight,
        _b = 1,
        _a = -1 / _viewPort,
        _opacity = _a * scrollPosition + _b;

    if (_opacity < 0 || _opacity > 1 ) {
        _opacity = 0;
    }

    $(".profileImg").css({ opacity: _opacity });
};
window.addEventListener('scroll', perfilOpacity);


// -- Sections state --
// function sectionState () {
// const _sections = document.querySelector(".section.about_s");

// _sections.addEventListener("click", () => {
//     for (var i; i < _sections.length; i++) {
//         _sections[i].classList.remove("active");
//     }
// });
// }
// sectionState();


/*/smooth scroll to section
$("nav").find("a").click(function(e) {
    e.preventDefault();
    var section = $(this).attr("href");
    console.log($(section).offset().top);
    $("html, body").stop().animate(
        { scrollTop: $(section).offset().top },
        1500, 'swing', () => { console.log("done") }
    );
});*/


// --- ABOUT ---
// -- main svg shape fixed --
function scro() {
    // Detect scroll position
    let scrollPosition = Math.round(window.scrollY);
    var _height = window.innerHeight;

    if (scrollPosition >= _height ) {
        $(".svg_shape").addClass("fixed");
    } else $(".svg_shape").removeClass("fixed");

    console.log("scroll position: " + _height);
};
// window.addEventListener('scroll', scro);


// $(".nav-link.1").click(function() {
//     $('html, body').animate({
//         scrollTop: $("#about").offset().top
//     }, 1500);
// });


// -- go to top with anim --
// $('#go-to-top').each(function(){
//     $(this).click(function(){ 
//         $('html,body').animate({ scrollTop: 0 }, 'slow');
//         return false; 
//     });
// });


/* page links navegation
$(".nav a").click(function(e){
    e.preventDefault();
    $hash = $(this).attr("href");
    scrollToSection($hash);
});
$(".section_state a").click(function(e){
    e.preventDefault();
    $hash = $(this).attr("href");
    scrollToSection($hash);
});*/
/*/ onload
$(document).ready(function () {
    scrollToSection(window.location.hash);
});*/

function scrollToSection(section) {
    // restart/end portfolio
    portfolioSlide(section);

    $sectionTop = $(section).offset().top;
    window.scrollTo(0, $sectionTop);
};

function portfolioSlide(section) {
    $portfolio = $("#projects");
    if($(section).offset().top > $portfolio.offset().top) {
        $portfolio.slick('slickGoTo', portfolioSlideLen);
    } else $portfolio.slick('slickGoTo', 0);
}