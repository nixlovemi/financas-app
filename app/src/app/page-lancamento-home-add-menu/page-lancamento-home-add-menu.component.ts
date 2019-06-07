import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PageLancamentoEditPage } from '../page-lancamento-edit/page-lancamento-edit.page';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-page-lancamento-home-add-menu',
  templateUrl: './page-lancamento-home-add-menu.component.html',
  styleUrls: ['./page-lancamento-home-add-menu.component.scss'],
})
export class PageLancamentoHomeAddMenuComponent implements OnInit {

  constructor(
    public modalController: ModalController,
    public globals: GlobalsService,
  ) { }

  ngOnInit() {}

  async showModalNovoLcto(){
    const modal = await this.modalController.create({
      component: PageLancamentoEditPage,
      componentProps: {
        arrVariaveis: [],
        itensBaseDespesa: this.globals.getItensBaseDespesa(),
        itensConta: this.globals.getItensConta()
      }
    });

    modal.onDidDismiss().then((detail) => {
       //this.filtrar();
       //console.log(123);
    });

    return await modal.present();
  }

  showModalNovaTrans(){}
}
