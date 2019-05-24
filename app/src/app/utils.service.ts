import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  webServicePath = '';

  constructor(
    public alertCtr: AlertController,
  ) {
    this.webServicePath = 'http://crochepassoapasso.com.br/financas/Rest/';
  }

  getWsPath(){
    return this.webServicePath;
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
}
