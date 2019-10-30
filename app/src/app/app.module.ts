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

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { Firebase } from '@ionic-native/firebase/ngx';
import { FcmService } from './fcm.service';
import { CurrencyPipe } from '@angular/common';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt, 'pt');

var firebaseConfig = {
  apiKey: "AIzaSyAGYKfXdt47eXyRbpQ1KLxN9e_EQodmLjU",
  authDomain: "financas-app-5e785.firebaseapp.com",
  databaseURL: "https://financas-app-5e785.firebaseio.com",
  projectId: "financas-app-5e785",
  storageBucket: "financas-app-5e785.appspot.com",
  messagingSenderId: "394158193696",
  appId: "1:394158193696:web:c3668677e1fca309281045",
  measurementId: "G-EFZJE79BTH"
};

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
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Firebase,
    FcmService,
    CurrencyPipe,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
