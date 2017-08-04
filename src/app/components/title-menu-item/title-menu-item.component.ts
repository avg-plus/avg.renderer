import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'title-menu-item',
  templateUrl: './title-menu-item.component.html',
  styleUrls: ['./title-menu-item.component.scss']
})
export class TitleMenuItemComponent implements OnInit {

  @Input('item-data') itemData;
  constructor() { }

  ngOnInit() {
  }

}
