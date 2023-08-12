function makeStuff() {
    let contactElements = ['email', 'linkedin', 'github'];
    let animations = [];

    contactElements.forEach(item => {
        let animation = new TimelineMax({paused: true});
        animation.to('#underline-' + item, 0.4, {width: '100%', transformOrigin:"left", ease: Power2.easeOut});
        animations.push(animation);
    });

    contactElements.forEach(item => {
        $('#' + item).hover(() => {
            animations[contactElements.indexOf(item)].play();
        }, () => {
            animations[contactElements.indexOf(item)].reverse();
        })
    });
}

makeStuff();

let currentScroll = 0;
let isScrollingDown = true;

let tween = gsap.to("#customMarquee__part", {xPercent: -100, repeat: -1, duration: 10, ease: "linear"}).totalProgress(0.5);

gsap.set("#customMarquee__inner", {xPercent: -50});

window.addEventListener("scroll", function(){
  
  if ( window.pageYOffset > currentScroll ) {
    isScrollingDown = true;
  } else {
    isScrollingDown = false;
  }
   
  gsap.to(tween, {
    timeScale: isScrollingDown ? 1 : -1
  });
  
  currentScroll = window.pageYOffset
});
