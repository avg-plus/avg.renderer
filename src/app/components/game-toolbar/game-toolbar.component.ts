import { OnInit, AfterViewInit, Component } from "@angular/core";
import { GameToolbarService } from "./main-scene.service";


@Component({
  selector: "game-toolbar",
  templateUrl: "./game-toolbar.component.html",
  styleUrls: ["./game-toolbar.component.scss"],
  animations: [
  ]
})
export class GameToolbarComponent implements OnInit, AfterViewInit {

  private service = GameToolbarService;
  constructor() { 
    
  }


  ngOnInit() { 

  }

  ngAfterViewInit() { }
}