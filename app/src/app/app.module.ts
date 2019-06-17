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

const config = {
  apiKey: "AIzaSyAGbez12htJe7-1negiVN24RLMXRWWDjfA",
  authDomain: "financas-croche.firebaseapp.com",
  databaseURL: "https://financas-croche.firebaseio.com",
  projectId: "financas-croche",
  storageBucket: "financas-croche.appspot.com",
  messagingSenderId: "744119417732",
  appId: "1:744119417732:web:bb78d8fede472526"
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
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Firebase,
    FcmService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
