gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", ()=> {
    // bio
    gsap.from(".now .text", {
        scrollTrigger: {
            trigger: ".now",
            start: "top center"
        },
        y: 30, 
        opacity: 0,
        duration: 1
    });
    gsap.from(".ambitions .text", {
        scrollTrigger: {
            trigger: ".ambitions",
            start: "top center"
        },
        y: 30, 
        opacity: 0,
        duration: 1
    });

    // softw
    gsap.from(".state", {
        scrollTrigger: {
            trigger: ".programs",
            start: "top 60%", //---
            // toggleActions: "restart none restart none",
        },
        width: 0, 
        duration: 1
    });

    /* tech ---
    gsap.to(".tech", {
        scrollTrigger: {
            trigger: ".tech",
            start: "top 30%",
            scrub: 1
        },
        height: 0
    });*/
    
    setTimeout(()=> {
        gsap.to("._row", {
            scrollTrigger: {
                trigger: ".tech",
                scrub: 1,
                start: "top bottom+=100",
                // end: "bottom-=40%", ---
                end: "bottom top",
                toggleClass: { targets: "._cont", className: "active" },
                // markers: true
            },
            x: "-45%"
        });
        gsap.from("._row1", {
            scrollTrigger: {
                trigger: ".tech",
                scrub: 1
            },
            x: "-30%"
        });
    }, 1000);

    // portfolio
    setTimeout(()=> {
        let projs = gsap.utils.toArray("#projects > div");
        gsap.to(projs, {
            yPercent: -100 * projs.length - 1,
            ease: "none",
            scrollTrigger: {
                trigger: "#projects",
                pin: true,
                pinSpacing: false,
                // markers: true,
                scrub: .5,
                snap: 1/ (projs.length),
                // end: ()=> "+=" + document.querySelector("#projects").offsetHeight,
                end: "bottom bottom",
                toggleClass: { targets: ".header", className: "onPortfolio" },
                onUpdate: self => updateState(self.progress)
            }
        });

        gsap.set("._background.pc", {
            scrollTrigger: {
                trigger: "#projects",
                start: "top top",
                end: "bottom bottom",
                pin: "._background.pc",
                pinSpacing: false
            }
        })
    }, 1500);

    // portfolio mobile
    gsap.set(".before .bg", { y: 30 });
    gsap.set(".work .before", { autoAlpha: 0 });
    ScrollTrigger.batch(".before .bg", {
        start: "top-=20 75%", 
        onEnter: batch => gsap.to(batch, { y: 0 })
    });
    ScrollTrigger.batch(".work .before", {
        start: "top 75%", 
        onEnter: batch => gsap.to(batch, { autoAlpha: 1 })
    });
});


let prevProj = 0;
function updateState (progress) {
    const currProj = (progress / (1/4) + 1).toFixed(0),
        h = document.querySelector(".number h1"),
        d = document.querySelectorAll(".portfolio_state > div");

    if (prevProj != currProj && currProj < 5) {
        prevProj = currProj;
        h.innerHTML = "0" + currProj + "/";
        d.forEach((i, k) => {
            i.classList.remove("active");
            k == currProj - 1 && i.classList.add("active");
        })
    }
}