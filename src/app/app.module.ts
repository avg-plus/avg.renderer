import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import 'polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { TitleViewComponent } from './components/title-view/title-view.component';
import { TitleMenuComponent } from './components/title-menu/title-menu.component';
import { TitleViewService } from './components/title-view/title-view.service';
import { TitleMenuItemComponent } from './components/title-menu-item/title-menu-item.component';
import { TransitionCanvasComponent } from './components/transition-canvas/transition-canvas.component';
import { MainSceneComponent } from './components/main-scene/main-scene.component';

import { AppRoutingModule } from './app-routing.module';

import { ElectronService } from './providers/electron.service';
import { BackgroundCanvasComponent } from './components/background-canvas/background-canvas.component';
import { DialogueBoxComponent } from './components/dialogue-box/dialogue-box.component';
import { CharacterBoxComponent } from './components/character-box/character-box.component';
import { MainSceneService } from './components/main-scene/main-scene.service';

@NgModule({
  declarations: [
    AppComponent,
    TitleViewComponent,
    TitleMenuComponent,
    TitleMenuItemComponent,
    TransitionCanvasComponent,
    MainSceneComponent,
    BackgroundCanvasComponent,
    DialogueBoxComponent,
    CharacterBoxComponent
    // HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    ElectronService,
    TitleViewService,
    MainSceneService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
