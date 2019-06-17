import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Platform } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class FcmService {
  // https://github.com/arnesson/cordova-plugin-firebase/blob/master/docs/API.md

  constructor(private firebase: Firebase,
              private afs: AngularFirestore,
              private platform: Platform) {}

  async getToken() {
    let token;

    if (this.platform.is('android')) {
      token = await this.firebase.getToken();
    }

    if (this.platform.is('ios')) {
      token = await this.firebase.getToken();
      await this.firebase.grantPermission();
    }

    this.saveToken(token);
  }

  private saveToken(token) {
    if (!token) return;

    return token;
    /*const devicesRef = this.afs.collection('devices');

    const data = {
      token,
      userId: 'testUserId'
    };

    return devicesRef.doc(token).set(data);*/
  }

  async subscribeTopic(topic){
    var token = this.getToken();
    return this.firebase.subscribe(topic);
  }

  async unsubscribeTopic(topic){
    var token = this.getToken();
    return this.firebase.unsubscribe(topic);
  }

  onNotifications() {
    return this.firebase.onNotificationOpen();
  }
}
