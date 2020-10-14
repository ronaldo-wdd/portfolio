// ---- jQuery ----
$(document).ready(function () {
    $(document).on("scroll", currSection);
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


// --- ABOUT ---
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