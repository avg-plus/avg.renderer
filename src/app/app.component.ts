import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ElectronService } from './providers/electron.service';
import { transition } from 'app/common/manager/transition';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  constructor(public electronService: ElectronService, private router: Router, private elementRef: ElementRef) {

    if (electronService.isElectron()) {
      console.log('Mode electron');
      // Check if electron is correctly injected (see externals in webpack.config.js)
      // console.log('c', electronService.ipcRenderer);
      // Check if nodeJs childProcess is correctly injected (see externals in webpack.config.js)
      // console.log('c', electronService.childProcess);
    } else {
      console.log('Mode web');
    }

    // setTimeout(() => {
    // }, 10000);
  }

  ngAfterViewInit() {
    const element = this.elementRef.nativeElement.querySelector('#avg-transition');
    transition.init(element);

    this.router.navigate(['title-view']);
  }

}
