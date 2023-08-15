function homePageScript() {
    let appearAnimation;
    let contentItems = $('#body').children();
    if(appearAnimation === undefined) {
        appearAnimation = new TimelineMax({paused: true});
        appearAnimation.staggerFrom(contentItems, 1.2, {opacity: 0, y: `50%`, ease: Power2.easeOut}, 0.6);
    }
    appearAnimation.play();
}

setTimeout(homePageScript, 550);

