import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MainSceneComponent } from "./components/main-scene/main-scene.component";
import { GameInitializer } from "./game-initializer";

const routes: Routes = [
  // { path: "title-view", component: TitleViewComponent },
  {
    path: "main-scene",
    component: MainSceneComponent,
    canActivate: [GameInitializer]
  }
  // { path: "**", component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
