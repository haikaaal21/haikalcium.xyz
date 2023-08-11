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

