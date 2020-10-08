const cont = document.querySelector("._cont"),
    pageHeight = window.innerHeight,
    tech = [
        { name: 'html', lvl: 1, color: '#dd693e' },
        { name: 'xml', lvl: 4, color: '#ed903b' },
        { name: 'css', lvl: 1, color: '#1565af' },
        { name: 'redux', lvl: 5, color: '#764abc' },
        { name: 'php', lvl: 2, color: '#51467f' },
        { name: 'jquery', lvl: 3, color: '#0088c4' },
        { name: 'android', lvl: 6, color: '#10485d' },
        { name: 'java', lvl: 4, color: '#e32322' },
        { name: 'sql', lvl: 2, color: '#009fdd' },
        { name: 'sass', lvl: 2, color: '#d483a7' },
        { name: 'js', lvl: 1, color: '#e0c14a' },
        { name: 'react js', lvl: 2, color: '#61dafb' },
        { name: 'wordpress', lvl: 5, color: '#1d1d1b' },
        { name: 'grav', lvl: 5, color: '#ba87cf' },
        { name: 'gsap', lvl: 6, color: '#79B408' },
        { name: 'firebase', lvl: 5, color: '#FFA000' },
        { name: 'bootstrap', lvl: 3, color: '#7952B3' }
    ];
let c = true;


['load', 'resize'].forEach( event =>
    window.addEventListener(event, ()=> {
        // criar div (rows)
        const newDiv = () => {
            var div = document.createElement("div"),
                elems = createElems();

            // div.className = "_row";
            elems.forEach(el => div.appendChild(el));
            
            return div;
        }

        // criar elems 
        const createElems = () => {
            var array = shuffleArray(), 
                elems = [];

            array.forEach(tech => {
                var el = document.createElement("h" + tech.lvl),
                    txt = document.createTextNode(tech.name);
                
                el.appendChild(txt);
                el.style.color = tech.color;

                elems.push(el);
            });

            return elems;
        }

        // shuffle tech array 
        const shuffleArray = () => {
            var currentIndex = tech.length, temporaryValue, randomIndex;

            while (currentIndex !== 0) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                temporaryValue = tech[currentIndex];
                tech[currentIndex] = tech[randomIndex];
                tech[randomIndex] = temporaryValue;
            }

            return tech;
        }

        // add tech to DOM
        while (cont.clientHeight < pageHeight) {
            const newD = newDiv();
            let className = c ? "_row" : "_row1";

            newD.className = className;
            cont.appendChild(newD);

            c = !c;
        }
    })
);