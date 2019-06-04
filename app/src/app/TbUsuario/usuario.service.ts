import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { UtilsService } from '../utils.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  wsPath = '';
  appKey = '';

  constructor(public http: Http, public utils: UtilsService) {
    this.wsPath = this.utils.getWsPath();
    this.appKey = this.utils.getAppKey();
  }

  doLogin(user, password){
    return new Promise(
      (resolve, reject) => {
        var link   = this.wsPath + '/checkLogin';
        var myData = JSON.stringify({user: user, password: password, appkey: this.appKey});

        this.http.post(link, myData)
        .subscribe(data => {
          let jsonRet;
          console.log(data);
          jsonRet = JSON.parse(data["_body"]);

          resolve(jsonRet);
        }, error => {
          reject('Erro ao fazer login! Erro:' + error);
        });
      }
    );
  }
}
