import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { TitleViewComponent } from "./components/title-view/title-view.component";
import { TitleMenuComponent } from "./components/title-menu/title-menu.component";
import { TitleMenuItemComponent } from "./components/title-menu-item/title-menu-item.component";
import { TransitionLayerComponent } from "./components/transition-layer/transition-layer.component";
import { MainSceneComponent } from "./components/main-scene/main-scene.component";
import { ReloadViewComponent } from "./components/reload-view/reload-view.component";

const routes: Routes = [
  { path: "title-view", component: TitleViewComponent },
  { path: "main-scene", component: MainSceneComponent },
  { path: "reload-view", component: ReloadViewComponent },
  { path: "**", component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
