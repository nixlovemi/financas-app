import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { BrMaskerModule } from 'br-mask';
import { UtilsService } from '../utils.service';
import { LancamentoService } from '../TbLancamento/lancamento.service';

@Component({
  selector: 'app-page-lancamento-edit',
  templateUrl: './page-lancamento-edit.page.html',
  styleUrls: ['./page-lancamento-edit.page.scss'],
})
export class PageLancamentoEditPage implements OnInit {
  vInserindo   = false;
  vIonTitle    = '';
  arrVariaveis = [];
  itensTipo    = [
    {id: 'R', text: 'Receita', },
    {id: 'D', text: 'Despesa'},
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
    public TbLancamento: LancamentoService,
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

    if(typeof this.arrVariaveis["arrLancamentoDados"] === 'undefined'){
      this.vIonTitle           = 'Novo Lançamento';
      this.vInserindo          = true;
    } else {
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

      this.vIonTitle           = 'Lançamento ID' + this.lctoInfo.id;
      this.vInserindo          = false;
    }
  }

  closeModal() {
    this.modalController.dismiss();
  }

  executaSalvar(){
    if(this.vInserindo == true){
      this.insereLancamento();
    } else {
      this.editaLancamento();
    }
  }

  insereLancamento(){
    this.TbLancamento.inserir(this.lctoInfo).then((response) => {
      var erro = response["erro"];
      var msg  = response["msg"];

      if(erro == true){
        this.utils.showAlert('Erro!', '', msg, ['OK']);
      } else {
        this.utils.showAlert('Sucesso!', '', msg, ['OK']);
        this.closeModal();
      }
    })
    .catch((error) => {
      this.utils.showAlert('Erro!', '', 'Erro ao inserir lançamento. Mensagem:' + error, ['OK']);
    });
  }

  editaLancamento(){
    this.TbLancamento.editar(this.lctoInfo).then((response) => {
      var erro = response["erro"];
      var msg  = response["msg"];

      if(erro == true){
        this.utils.showAlert('Erro!', '', msg, ['OK']);
      } else {
        this.utils.showAlert('Sucesso!', '', msg, ['OK']);
        this.closeModal();
      }
    })
    .catch((error) => {
      this.utils.showAlert('Erro!', '', 'Erro ao editar lançamento. Mensagem:' + error, ['OK']);
    });
  }

  deletar(){
    this.utils.showAlert('Confirmação', '', 'Deseja realmente deletar o lançamento ID ' + this.lctoInfo.id, [
      {
        text: 'Não',
        handler: () => { }
      },
      {
        text: 'Sim',
        handler: () => {
          this.TbLancamento.deletar(this.lctoInfo.id).then((response) => {
            var erro = response["erro"];
            var msg  = response["msg"];

            if(erro == true){
              this.utils.showAlert('Erro!', '', msg, ['OK']);
            } else {
              this.utils.showAlert('Sucesso!', '', msg, ['OK']);
              this.closeModal();
            }
          })
          .catch((error) => {
            this.utils.showAlert('Erro!', '', 'Erro ao deletar lançamento. Mensagem:' + error, ['OK']);
          });
        }
      }
    ]);
  }
}
