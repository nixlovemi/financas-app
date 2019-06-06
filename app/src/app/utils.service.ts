import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  webServicePath = '';
  appKey = '';

  constructor(
    public alertCtr: AlertController,
  ) {
    this.webServicePath = 'http://crochepassoapasso.com.br/financas/Rest/';
    this.appKey = '9837f6f54e56b471aaa046192d488587';
  }

  getWsPath(){
    return this.webServicePath;
  }

  getAppKey(){
    return this.appKey;
  }

  async showAlert(header, subHeader, message, buttons) {
    //const alertController = document.querySelector('ion-alert-controller');
    //await alertController.componentOnReady();

    const alert = await this.alertCtr.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: buttons,

    });
    return await alert.present();
  }

  getDateString(){
    var arrInfo =
    {
      monthNames: 'Janeiro, Fevereiro, Março, Abril, Maio, Junho, Julho, Agosto, Setembro, Outubro, Novembro, Dezembro',
      monthShortNames: 'Jan, Fev, Mar, Abr, Mai, Jun, Jul, Ago, Set, Out, Nov, Dez',
      dayNames: 'Domingo, Segunda-Feira, Terça-Feira, Quarta-Feira, Quinta-Feira, Sexta-Feira, Sábado',
      dayShortNames: 'Dom, Seg, Ter, Qua, Qui, Sex, Sáb'
    };

    return arrInfo;
  }

  /*
  date: tem que ser no formato ISO String (new Date().toISOString())
  */
  formatDate(date, format='YYYY-MM-DD'){
    // 2019-05-24T19:29:44.645
    let strDateFmt = '';
    let strDate    = '' + date.replace('Z', '');

    if(strDate != '' && strDate != null){
      let ano     = strDate.substr(0, 4);
      let mes     = strDate.substr(5, 2);
      let dia     = strDate.substr(8, 2);
      let hora    = strDate.substr(11, 2);
      let minuto  = strDate.substr(14, 2);
      let segundo = strDate.substr(17, 2);

      strDateFmt  = format.replace('YYYY', ano).replace('MM', mes).replace('DD', dia).replace('HH', hora).replace('MI', minuto).replace('SS', segundo);
    }
    return strDateFmt;
  }

  formatMoney(valor, decimais=2, simbolo='') {
    if(isNaN(valor)){
      return '';
    } else {
      var vValor = parseFloat(valor);
      var numero = vValor.toFixed(decimais).split('.');
      numero[0]  = simbolo + numero[0].split(/(?=(?:...)*$)/).join('.');
      return numero.join(',');
    }
  }

  acertaMoeda(valor){
    if (valor.length <= 0) {
        return null;
    }

    var novoValor = valor.replace(".", "").replace(",", ".").replace("R$", "").replace("US$", "").replace("U$", "").replace("$", "").replace(" ", "");
    return novoValor;
  }
}
