import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { UtilsService } from '../utils.service';

@Injectable({
  providedIn: 'root'
})
export class BaseDespesaService {
  wsPath = '';

  constructor(public http: Http, public utils: UtilsService) {
    this.wsPath = this.utils.getWsPath();
  }

  getBaseDespesas()
  {
    return new Promise(
      (resolve, reject) => {
        var link   = this.wsPath + '/getBaseDespesas';
        var myData = JSON.stringify({});

        this.http.post(link, myData)
        .subscribe(data => {
          let jsonRet;
          jsonRet = JSON.parse(data["_body"]);

          resolve(jsonRet);
        }, error => {
          reject('Erro ao buscar base despesas! Erro:' + error);
        });
      }
    );
  }
}
