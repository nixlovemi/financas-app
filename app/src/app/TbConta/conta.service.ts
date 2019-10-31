import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { UtilsService } from '../utils.service';

@Injectable({
  providedIn: 'root'
})
export class ContaService {
  wsPath = '';
  appKey = '';

  constructor(public http: Http, public utils: UtilsService) {
    this.wsPath = this.utils.getWsPath();
    this.appKey = this.utils.getAppKey();
  }

  getContas()
  {
    return new Promise(
      (resolve, reject) => {
        var link   = this.wsPath + '/getContas';
        var myData = JSON.stringify({'appkey':this.appKey});

        this.http.post(link, myData)
        .subscribe(data => {
          let jsonRet;
          jsonRet = JSON.parse(data["_body"]);

          resolve(jsonRet);
        }, error => {
          reject('Erro ao buscar contas! Erro:' + error);
        });
      }
    );
  }

  getSaldoContas(mes, ano)
  {
    return new Promise(
      (resolve, reject) => {
        var link   = this.wsPath + '/getSaldoContas';
        var myData = JSON.stringify({'mes':mes, 'ano':ano, 'appkey':this.appKey});

        this.http.post(link, myData)
        .subscribe(data => {
          let jsonRet;
          jsonRet = JSON.parse(data["_body"]);

          resolve(jsonRet);
        }, error => {
          reject('Erro ao buscar saldo das contas! Erro:' + error);
        });
      }
    );
  }
}
