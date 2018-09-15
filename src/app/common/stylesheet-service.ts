import { Injectable } from "@angular/core";

@Injectable()
export class StylesheetService {
  public initMaskStylesheets() {

    // $(".scene-mask-transition").css({
    //   color: "purple",
    //   "font-size": "20px"
    // });

    // Modified styles dynamically
    // for (let i = 0; i < document.styleSheets.length; i++) {
    //   const sheet = document.styleSheets[i] as CSSStyleSheet;

    //   if (sheet && sheet.cssRules) {
    //     const rules = sheet.cssRules;
    //     for (let s = 0; s < rules.length; s++) {
    //       if (rules[s] instanceof CSSStyleRule) {
    //         const cssRule = <CSSStyleRule>rules[s];
    //         const selectorText = (<CSSStyleRule>rules[s]).selectorText;
    //         if (selectorText.includes(".scene-mask-transition")) {
    //           console.log(selectorText);
    //           cssRule.style.mask = `url("asd")`;
    //         }
    //       }
    //     }
    //   }
    // }
  }
}
