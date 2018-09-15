import { Component, Input, OnInit } from "@angular/core";
import { TitleMenuModel } from "../../common/models/title-menu-model";

@Component({
  selector: "title-menu",
  templateUrl: "./title-menu.component.html",
  styleUrls: ["./title-menu.component.scss"]
})
export class TitleMenuComponent implements OnInit {
  @Input("items") items: Array<TitleMenuModel> = [];
  @Input("currentIndex") currentIndex = 0;

  constructor() {
  }

  ngOnInit() {
  }
}
