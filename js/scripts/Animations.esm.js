class Animations{ 
    constructor(){
        this.animationDelay = 500;
    }

    inputAnimation(background, box){

        const backgroundTimeline = gsap.timeline();

        const backgroundId = `#${background}`;
        const boxId = `#${box}`;

        backgroundTimeline
                .set(backgroundId, {opacity: 0})
                .to(backgroundId, .2, {opacity:1});

        const boxTimeline = gsap.timeline();

        boxTimeline
                .set(boxId, {y:100, opacity:0})
                .to(boxId, .5, {y:0, opacity:1});
    }

    outputAnimation(background, box){
        
        const backgroundId = `#${background}`;
        const boxId = `#${box}`;

        const boxTimeline = gsap.timeline();

        boxTimeline
                .set(boxId, {y:0, opacity:1})
                .to(boxId, .3, {y:100, opacity:0});


        const backgroundTimeline = gsap.timeline({
            delay: .3,
        });

        backgroundTimeline
                .set(backgroundId, {opacity: 1})
                .to(backgroundId, .2, {opacity:0});
    }
}

export const animations = new Animations();