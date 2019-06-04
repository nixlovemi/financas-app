import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { UtilsService } from '../utils.service';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {
  wsPath = '';
  appKey = '';

  constructor(public http: Http, public utils: UtilsService) {
    this.wsPath = this.utils.getWsPath();
    this.appKey = this.utils.getAppKey();
  }

  getLancamentos(arrInfo){
    return new Promise(
      (resolve, reject) => {
        var link   = this.wsPath + '/getLancamentos';
        var myData = JSON.stringify(arrInfo);

        this.http.post(link, myData)
        .subscribe(data => {
          let jsonRet;
          jsonRet = JSON.parse(data["_body"]);

          resolve(jsonRet);
        }, error => {
          reject('Erro ao buscar lancamentos! Erro:' + error);
        });
      }
    );
  }

  getLancamento(lanId){
    return new Promise(
      (resolve, reject) => {
        var link   = this.wsPath + '/getLancamento';
        var myData = JSON.stringify({'id':lanId, 'appkey':this.appKey});

        this.http.post(link, myData)
        .subscribe(data => {
          let jsonRet;
          jsonRet = JSON.parse(data["_body"]);

          resolve(jsonRet);
        }, error => {
          reject('Erro ao buscar lancamentos! Erro:' + error);
        });
      }
    );
  }
}
