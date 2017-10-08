import * as PIXI from 'pixi.js';
import * as particles from 'pixi-particles';
import { FPSCtrl } from '../fps-ctrl';

const rain_json = require('./data/effect-rain.json');

export class Effects {

    public static shake(htmlElement: any) {
        let shakingElements = [];

        let doShake = function (element, magnitude = 16, angular = false) {
            // First set the initial tilt angle to the right (+1)
            let tiltAngle = 1;

            // A counter to count the number of shakes
            let counter = 1;

            // The total number of shakes (there will be 1 shake per frame)
            let numberOfShakes = 15;

            // Capture the element's position and angle so you can
            // restore them after the shaking has finished
            let startX = 0,
                startY = 0,
                startAngle = 0;

            //  Divide the magnitude into 10 units so that you can
            //  reduce the amount of shake by 10 percent each frame
            let magnitudeUnit = magnitude / numberOfShakes;

            // The `randomInt` helper function
            let randomInt = (min, max) => {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            };

            // Add the element to the `shakingElements` array if it
            // isn't already there
            if (shakingElements.indexOf(element) === -1) {
                // console.log("added")
                shakingElements.push(element);

                // Add an `updateShake` method to the element.
                // The `updateShake` method will be called each frame
                // in the game loop. The shake effect type can be either
                // up and down (x/y shaking) or angular (rotational shaking).
                if (angular) {
                    angularShake();
                } else {
                    upAndDownShake();
                }
            }

            // The `upAndDownShake` function
            function upAndDownShake() {

                // Shake the element while the `counter` is less than
                // the `numberOfShakes`
                if (counter < numberOfShakes) {

                    // Reset the element's position at the start of each shake
                    element.style.transform = 'translate(' + startX + 'px, ' + startY + 'px)';

                    // Reduce the magnitude
                    magnitude -= magnitudeUnit;

                    // Randomly change the element's position
                    let randomX = randomInt(-magnitude, magnitude);
                    let randomY = randomInt(-magnitude, magnitude);

                    element.style.transform = 'translate(' + randomX + 'px, ' + randomY + 'px)';

                    // Add 1 to the counter
                    counter += 1;

                    requestAnimationFrame(upAndDownShake);
                }

                // When the shaking is finished, restore the element to its original 
                // position and remove it from the `shakingElements` array
                if (counter >= numberOfShakes) {
                    element.style.transform = ''// 'translate(' + startX + ', ' + startY + ')';
                    shakingElements.splice(shakingElements.indexOf(element), 1);
                }
            }

            // The `angularShake` function
            function angularShake() {
                if (counter < numberOfShakes) {
                    console.log(tiltAngle);
                    // Reset the element's rotation
                    element.style.transform = 'rotate(' + startAngle + 'deg)';

                    // Reduce the magnitude
                    magnitude -= magnitudeUnit;

                    // Rotate the element left or right, depending on the direction,
                    // by an amount in radians that matches the magnitude
                    let angle = Number(magnitude * tiltAngle).toFixed(2);
                    console.log(angle);
                    element.style.transform = 'rotate(' + angle + 'deg)';
                    counter += 1;

                    // Reverse the tilt angle so that the element is tilted
                    // in the opposite direction for the next shake
                    tiltAngle *= -1;

                    requestAnimationFrame(angularShake);
                }

                // When the shaking is finished, reset the element's angle and
                // remove it from the `shakingElements` array
                if (counter >= numberOfShakes) {
                    element.style.transform = 'rotate(' + startAngle + 'deg)';
                    shakingElements.splice(shakingElements.indexOf(element), 1);
                    // console.log("removed")
                }
            }

        };

        doShake(htmlElement);
    }


    public static rain(canvas: any) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        if (canvas.getContext) {
            let ctx = canvas.getContext('2d');
            let w = canvas.width;
            let h = canvas.height;
            ctx.strokeStyle = 'rgba(174,194,224,0.9)';
            ctx.lineWidth = 2;
            //  ctx.lineCap = 'round';

            let init = [];
            let maxParts = 800;
            for (let a = 0; a < maxParts; a++) {
                init.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    l: Math.random() * 1,
                    xs: -4 + Math.random() * 4 + 2,
                    ys: Math.random() * 10 + 10
                })
            }

            let particles = [];
            for (let b = 0; b < maxParts; b++) {
                particles[b] = init[b];
            }

            let draw = function () {
                ctx.clearRect(0, 0, w, h);
                for (let c = 0; c < particles.length; c++) {
                    let p = particles[c];
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
                    ctx.stroke();
                }
                move();
            }

            let move = function () {
                for (let b = 0; b < particles.length; b++) {
                    let p = particles[b];
                    p.x += p.xs;
                    p.y += p.ys;
                    if (p.x > w || p.y > h) {
                        p.x = Math.random() * w;
                        p.y = -20;
                    }
                }
            }

            setInterval(draw, 30);

            let fps = new FPSCtrl(10, () => {
                draw();
            });

            //  fps.start();
        }
    }


    public static snow(canvas) {
        // const canvas = canvas;

        // canvas init
        const ctx = canvas.getContext('2d');

        // canvas dimensions
        const W = window.innerWidth;
        const H = window.innerHeight;
        canvas.width = W;
        canvas.height = H;

        // snowflake particles
        const mp = 100; // max particles
        const particles = [];
        for (let i = 0; i < mp; i++) {
            particles.push({
                x: Math.random() * W, // x-coordinate
                y: Math.random() * H, // y-coordinate
                r: Math.random() * 4 + 1, // radius
                d: Math.random() * mp // density
            });
        }

        // Lets draw the flakes
        function draw() {
            ctx.clearRect(0, 0, W, H);

            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.beginPath();
            for (let i = 0; i < mp; i++) {
                const p = particles[i];
                ctx.moveTo(p.x, p.y);
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
            }
            ctx.fill();
            update();
        }

        // Function to move the snowflakes
        // angle will be an ongoing incremental flag.
        // Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
        let angle = 60;
        function update() {
            angle += 0.01;
            for (let i = 0; i < mp; i++) {
                const p = particles[i];
                // Updating X and Y coordinates
                // We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
                // Every particle has its own density which can be used to make the downward movement different for each flake
                // Lets make it more random by adding in the radius
                p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
                p.x += Math.sin(angle) * 2;

                // Sending flakes back from the top when it exits
                // Lets make it a bit more organic and let flakes enter from the left and right also.
                if (p.x > W + 5 || p.x < -5 || p.y > H) {
                    if (i % 3 > 0) { // 66.67% of the flakes
                        particles[i] = { x: Math.random() * W, y: -10, r: p.r, d: p.d };
                    } else {
                        // If the flake is exitting from the right
                        if (Math.sin(angle) > 0) {
                            // Enter from the left
                            particles[i] = { x: -5, y: Math.random() * H, r: p.r, d: p.d };
                        } else {
                            // Enter from the right
                            particles[i] = { x: W + 5, y: Math.random() * H, r: p.r, d: p.d };
                        }
                    }
                }
            }
        }

        // animation loop
        setInterval(draw, 20);

    }
}
