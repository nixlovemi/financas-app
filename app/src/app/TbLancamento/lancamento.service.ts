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

  getCategoriaGastos(mes, ano){
    return new Promise(
      (resolve, reject) => {
        var link   = this.wsPath + '/getCategoriaGastos';
        var myData = JSON.stringify({"mes":mes, "ano":ano, "appkey":this.appKey});

        this.http.post(link, myData)
        .subscribe(data => {
          let jsonRet;
          jsonRet = JSON.parse(data["_body"]);

          resolve(jsonRet);
        }, error => {
          reject('Erro ao buscar gastos por categoria! Erro:' + error);
        });
      }
    );
  }

  inserir(objLancamento){
    return new Promise(
      (resolve, reject) => {
        var vConfirmado = 0;
        if(objLancamento.isChecked == true){
          vConfirmado = 1;
        }

        var link   = this.wsPath + '/addLancamento';
        var myData = JSON.stringify(
          {
            "despesa"     : objLancamento.descricao,
            "tipo"        : objLancamento.tipo,
            "vencimento"  : this.utils.formatDate(objLancamento.vencimento, "YYYY-MM-DD"),
            "valor"       : this.utils.acertaMoeda(objLancamento.valor),
            "categoria"   : objLancamento.categoria,
            "pagamento"   : this.utils.formatDate(objLancamento.pagamento, "YYYY-MM-DD"),
            "valor_pago"  : this.utils.acertaMoeda(objLancamento.valor_pago),
            "conta"       : objLancamento.conta,
            "observacao"  : objLancamento.observacao,
            "confirmado"  : vConfirmado,
            "repeteMeses" : null,
            "appkey"      : this.appKey
          }
        );

        this.http.post(link, myData)
        .subscribe(data => {
          let jsonRet;
          jsonRet = JSON.parse(data["_body"]);

          resolve(jsonRet);
        }, error => {
          reject('Erro ao inserir lançamento! Erro:' + error);
        });
      }
    );
  }

  editar(objLancamento){
    return new Promise(
      (resolve, reject) => {
        var vConfirmado = 0;
        if(objLancamento.isChecked == true){
          vConfirmado = 1;
        }

        var vPagamento = '';
        if(objLancamento.pagamento != null){
          vPagamento = objLancamento.pagamento;
        }

        var link   = this.wsPath + '/editLancamento';
        var myData = JSON.stringify(
          {
            "id"          : objLancamento.id,
            "despesa"     : objLancamento.descricao,
            "tipo"        : objLancamento.tipo,
            "vencimento"  : this.utils.formatDate(objLancamento.vencimento, "YYYY-MM-DD"),
            "valor"       : this.utils.acertaMoeda(objLancamento.valor),
            "categoria"   : objLancamento.categoria,
            "pagamento"   : this.utils.formatDate(vPagamento, "YYYY-MM-DD"),
            "valor_pago"  : this.utils.acertaMoeda(objLancamento.valor_pago),
            "conta"       : objLancamento.conta,
            "observacao"  : objLancamento.observacao,
            "confirmado"  : vConfirmado,
            "appkey"      : this.appKey
          }
        );

        this.http.post(link, myData)
        .subscribe(data => {
          let jsonRet;
          jsonRet = JSON.parse(data["_body"]);

          resolve(jsonRet);
        }, error => {
          reject('Erro ao editar lançamento! Erro:' + error);
        });
      }
    );
  }

  deletar(idLancamento){
    return new Promise(
      (resolve, reject) => {
        var link   = this.wsPath + '/deleteLancamento';
        var myData = JSON.stringify(
          {
            "id"     : idLancamento,
            "appkey" : this.appKey
          }
        );

        this.http.post(link, myData)
        .subscribe(data => {
          let jsonRet;
          jsonRet = JSON.parse(data["_body"]);

          resolve(jsonRet);
        }, error => {
          reject('Erro ao deletar lançamento! Erro:' + error);
        });
      }
    );
  }
}
