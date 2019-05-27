import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { UtilsService } from '../utils.service';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {
  wsPath = '';

  constructor(public http: Http, public utils: UtilsService) {
    this.wsPath = this.utils.getWsPath();
  }

  getLancamentos(arrInfo){
    return new Promise(
      (resolve, reject) => {
        console.log(arrInfo);

        /*var link   = this.wsPath + '/getContas';
        var myData = JSON.stringify({});

        this.http.post(link, myData)
        .subscribe(data => {
          let jsonRet;
          jsonRet = JSON.parse(data["_body"]);

          resolve(jsonRet);
        }, error => {
          reject('Erro ao buscar contas! Erro:' + error);
        });*/
      }
    );
  }
}
