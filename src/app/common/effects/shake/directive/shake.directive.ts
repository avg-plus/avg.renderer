import { Directive, ElementRef, HostListener, Input, OnInit, Renderer, OnChanges, SimpleChanges, Renderer2, ChangeDetectorRef } from "@angular/core";
import { ShakeStyle } from "../interface/shake"

import * as $ from "jquery";

@Directive({
  selector: "[shake]"
})
export class ShakeDirective implements OnInit, OnChanges {

  @Input("shake") shake: ShakeStyle;

  private horizontal = 15;
  private vertical = 15;
  private rotation = 15;
  private duration = 1;
  private quantity = 0;  // : any = "infinite";
  private timingFunc = "ease-in-out";
  private interval = 1;
  private max = 100;
  private transformOrigin = "center center";
  private fixed = true;
  private fixedStop = false;
  private freez = false;
  private active = true;
  private trigger = ":hover";
  private elem = "div";

  private shouldShakeDefault = this.fixed || (!this.fixed && this.freez);
  private shouldShakeWhenTriggered = !this.fixed && !this.freez;
  private shakeKeyframeName = "shakeKF";
  private keyframes = this.doKeyframes();

  private shakeKeyframes = ``;
  private ShakeClass = ``;

  @HostListener("mouseenter", ["$event"]) onMouseEnter(event: any) {
    // this.mouseEnterFunc(event);
  }

  @HostListener("mouseleave") onMouseLeave() {
    // this.mouseLeaveFunc(event);
  }

  constructor(private myElem: ElementRef, private renderer2: Renderer2, protected changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    // Object.assign(this, this.shake);
    // this.initStyle();
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.shake && changes.shake.currentValue) {
      Object.assign(this, this.shake);
      this.initStyle();
    }
  }

  mouseEnterFunc(event: any) {
    // this.renderer.setElementClass(this.myElem.nativeElement, "shaking", false)
  }

  mouseLeaveFunc(event: any) {
    // this.renderer.setElementClass(this.myElem.nativeElement, "shaking", true)
  }

  random(max: number, min: number = 0): number {
    return (Math.random() * (max - min) - max / 2);
  }

  doKeyframes() {
    const kf = {};
    const init = "translate(0,0) rotate(0)";

    for (let st = this.interval; st <= this.max; st += this.interval) {

      const x = this.random(this.horizontal);
      const y = this.random(this.vertical);
      const rot = this.random(this.rotation);

      kf[`${st}%`] = {
        transform: `translate(${x}px, ${y}px) rotate(${rot}deg)`,
      }
    }

    kf[`0%`] = kf[`100%`] = {
      transform: init,
    }

    // Init if max < 100
    if (this.max < 100) {
      kf[`${this.max}%`] = {
        transform: init,
      }
    }

    // return kf;
    return Object.keys(kf).reduce((acc, next) => {
      return `${acc}
			${next} {
				transform: ${kf[next].transform}
			}`
    }, "");
  }

  async initStyle() {

    this.keyframes = this.doKeyframes();

    this.shakeKeyframes = `
    @keyframes ${this.shakeKeyframeName} {
      ${this.keyframes}
    }
    `;

    this.ShakeClass = `
    .shaking {
      animation-name: ${this.shouldShakeDefault && this.shakeKeyframeName};
      animation-duration: ${this.duration}ms;
      animation-iteration-count: ${this.quantity};
      animation-play-state: ${this.freez && (!this.fixed ? "paused" : "running")};
    }

    .shaking${this.trigger} {
        animation-name: ${this.shouldShakeWhenTriggered && this.shakeKeyframeName};
        animation-play-state: ${this.freez && (!this.fixed ? "running" : "paused")};
        animation: ${this.fixed && this.fixedStop && "initial"};
    }
    `;

    $("#shaking-style").remove();
    $(this.myElem.nativeElement).append(`
      <style id="shaking-style" type="text/css">
        ${this.shakeKeyframes + this.ShakeClass}
      </style>
      `)

    this.changeDetectorRef.detectChanges();
    $(".shaking").removeClass("shaking");

    setTimeout(() => {
      this.changeDetectorRef.detectChanges();
      $(this.myElem.nativeElement).addClass("shaking");
    }, 0);
  }


}
