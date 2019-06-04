import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { BrMaskerModule } from 'br-mask';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-page-lancamento-edit',
  templateUrl: './page-lancamento-edit.page.html',
  styleUrls: ['./page-lancamento-edit.page.scss'],
})
export class PageLancamentoEditPage implements OnInit {
  arrVariaveis = [];
  itensTipo    = [
    {id: 'R', text: 'Receita'},
    {id: 'D', text: 'Despesa'},
    {id: 'T', text: 'Transferência'},
  ];
  itensBaseDespesa = [];
  itensConta       = [];
  lctoInfo = {
    id: '',
    descricao: '',
    tipo: '',
    categoria: '',
    vencimento: '',
    valor: '',
    pagamento: '',
    valor_pago: '',
    conta: '',
    observacao: '',
    confirmado: '',
    isChecked : false,
  };

  constructor(
    public modalController: ModalController,
    private navParams: NavParams,
    public utils: UtilsService,
  ) { }

  ngOnInit() {
  }

  clearInput(element){
    this.lctoInfo[element] = '';
  }

  ionViewWillEnter() {
    this.arrVariaveis = this.navParams.get('arrVariaveis');

    this.itensBaseDespesa    = this.arrVariaveis["itensBaseDespesa"];
    this.itensConta          = this.arrVariaveis["itensConta"];

    this.lctoInfo.id         = this.arrVariaveis["arrLancamentoDados"]["lan_id"];
    this.lctoInfo.descricao  = this.arrVariaveis["arrLancamentoDados"]["lan_despesa"];
    this.lctoInfo.tipo       = this.arrVariaveis["arrLancamentoDados"]["lan_tipo"];
    this.lctoInfo.categoria  = this.arrVariaveis["arrLancamentoDados"]["lan_categoria"];
    this.lctoInfo.vencimento = this.arrVariaveis["arrLancamentoDados"]["lan_vencimento"];
    this.lctoInfo.valor      = this.utils.formatMoney(this.arrVariaveis["arrLancamentoDados"]["lan_valor"]);
    this.lctoInfo.pagamento  = this.arrVariaveis["arrLancamentoDados"]["lan_pagamento"];
    this.lctoInfo.valor_pago = this.utils.formatMoney(parseFloat(this.arrVariaveis["arrLancamentoDados"]["lan_valor_pago"]));
    this.lctoInfo.conta      = this.arrVariaveis["arrLancamentoDados"]["lan_conta"];
    this.lctoInfo.observacao = this.arrVariaveis["arrLancamentoDados"]["lan_observacao"];
    this.lctoInfo.confirmado = this.arrVariaveis["arrLancamentoDados"]["lan_confirmado"];
    this.lctoInfo.isChecked  = (this.lctoInfo.confirmado == '1');
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
