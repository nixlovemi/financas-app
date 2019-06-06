import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { MatButtonModule, MatCheckboxModule, MatExpansionModule } from '@angular/material';
import { MatTableModule } from  '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PageLancamentoEditPageModule } from './page-lancamento-edit/page-lancamento-edit.module';
import { BrMaskerModule } from 'br-mask';
import { PageLancamentoHomeAddMenuComponent } from './page-lancamento-home-add-menu/page-lancamento-home-add-menu.component';

@NgModule({
  declarations: [AppComponent, PageLancamentoHomeAddMenuComponent],
  entryComponents: [PageLancamentoHomeAddMenuComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpModule,
    MatButtonModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatTableModule,
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    PageLancamentoEditPageModule,
    BrMaskerModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
