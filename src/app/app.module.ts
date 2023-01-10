import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonClipComponent } from './components/button-clip/button-clip.component';
import { CardComponent } from './components/card/card.component';
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonTypeComponent } from './components/button-type/button-type.component';
import { SubMenuComponent } from './components/sub-menu/sub-menu.component';
import { MirasComponent } from './components/miras/miras.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ButtonClipComponent,
    CardComponent,
    MainComponent,
    HeaderComponent,
    ButtonTypeComponent,
    SubMenuComponent,
    MirasComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
