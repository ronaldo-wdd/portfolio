const b = document.querySelector('#aa');

tl = new TimelineMax ();

tl.fromTo(b, { height: "0%" }, { height: "100vh" });