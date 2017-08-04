import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'background-canvas',
  templateUrl: './background-canvas.component.html',
  styleUrls: ['./background-canvas.component.scss']
})
export class BackgroundCanvasComponent implements OnInit, AfterViewInit {

  private _background: PIXI.Sprite;
  constructor(private elementRef: ElementRef) {

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // this.loadImageToViewport('assets/graphics/backgrounds/title.png');
    // this.loadParticleEffect();

  }

  loadImageToViewport(file: string) {
    const element = this.elementRef.nativeElement.querySelector('#avg-viewport');
    const app = new PIXI.Application(1366, 768, {
      backgroundColor: 0x000000
    });

    element.appendChild(app.view);

    if (this._background) {
      app.stage.removeChild(this._background);
    }

    this._background = PIXI.Sprite.fromImage(file);
    this._background.width = app.renderer.width;
    this._background.height = app.renderer.height;

    app.stage.addChild(this._background);
  }

  loadParticleEffect() {
    const canvas = this.elementRef.nativeElement.querySelector('#avg-particle-viewport');
    this.enableSnowEffect(canvas);
  }


  public enableSnowEffect(element) {
    const canvas = element;

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
