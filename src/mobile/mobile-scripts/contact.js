let footerAnimation = new TimelineMax({ paused: true });
footerAnimation.fromTo("#footer-addition", 0.5, {y: `30%`}, {y: `5%`});

function animationPlay() {
    footerAnimation.play();
    setTimeout(() => {
        footerAnimation.reverse();
    }, 3000);
}

setInterval(() => {
    animationPlay();
}, 8000);