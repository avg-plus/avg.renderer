import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TitleViewComponent } from './components/title-view/title-view.component';
import { TitleMenuComponent } from './components/title-menu/title-menu.component';
import { TitleMenuItemComponent } from './components/title-menu-item/title-menu-item.component';
import { TransitionCanvasComponent } from './components/transition-canvas/transition-canvas.component';
import { MainSceneComponent } from './components/main-scene/main-scene.component';

import { TitleViewService } from './components/title-view/title-view.service';

const routes: Routes = [
    { path: 'title-view', component: TitleViewComponent },
    { path: 'main-scene', component: MainSceneComponent },
    { path: '**', component: AppComponent }
];


@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
