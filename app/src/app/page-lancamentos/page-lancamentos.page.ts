import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { ContaService } from '../TbConta/conta.service';
import { BaseDespesaService } from '../TbBaseDespesa/base-despesa.service';
import { LancamentoService } from '../TbLancamento/lancamento.service';
import { UtilsService } from '../utils.service';
import { PageLancamentoEditPage } from '../page-lancamento-edit/page-lancamento-edit.page';

@Component({
  selector: 'app-page-lancamentos',
  templateUrl: './page-lancamentos.page.html',
  styleUrls: ['./page-lancamentos.page.scss'],
})

export class PageLancamentosPage implements OnInit {
  frmFiltros = {
    mes_base: '',
    vcto_inicial: '',
    vcto_final: '',
    pgto_inicial: '',
    pgto_final: '',
    descricao: '',
    conta: '',
    tipo: '',
    categoria: '',
    exibir: '',
  };
  limit            = 50;
  offset           = 0;
  itensConta       = [];
  itensBaseDespesa = [];
  itensTipo        = [
    {id: 'R', text: 'Receita'},
    {id: 'D', text: 'Despesa'},
    {id: 'T', text: 'Transferência'},
  ];
  itensExibir      = [
    {id: '', text: 'Todos os Lançamentos'},
    {id: 'S', text: 'Apenas Pagos'},
    {id: 'N', text: 'Apenas Não Pagos'},
  ];
  infoTabela = [];
  appKey = '';

  constructor(
    public TbConta: ContaService,
    public TbBaseDespesa: BaseDespesaService,
    public utils: UtilsService,
    public TbLancamento: LancamentoService,
    public loadingCtr: LoadingController,
    public modalController: ModalController,
  ) {
    let today = new Date().toISOString();
    this.frmFiltros.mes_base = today;
    this.appKey = this.utils.getAppKey();
  }

  ngOnInit() {

  }

  ionViewWillEnter(){
    this.loadingCtr.create({
      message: 'Carregando',
      spinner: 'dots',
    }).then((res) => {
      res.present();

      this.TbConta.getContas()
      .then((response) => {
        let erro      = response["erro"];
        let msg       = response["msg"];
        let arrContas = response["arrContas"];

        if(erro == true){
          this.itensConta = [];
        } else {
          this.itensConta = arrContas;
        }
      })
      .catch((err) => {
        res.dismiss();
        this.utils.showAlert('Erro!', '', 'Erro ao buscar contas. Mensagem:' + err, ['OK']);
      });

      this.TbBaseDespesa.getBaseDespesas()
      .then((response) => {
        let erro            = response["erro"];
        let msg             = response["msg"];
        let arrBaseDespesas = response["arrBaseDespesas"];

        if(erro == true){
          this.itensBaseDespesa = [];
        } else {
          this.itensBaseDespesa = arrBaseDespesas;
        }
      })
      .catch((err) => {
        res.dismiss();
        this.utils.showAlert('Erro!', '', 'Erro ao buscar contas. Mensagem:' + err, ['OK']);
      });

      let arrInfo = this.filterToArray();
      this.TbLancamento.getLancamentos(arrInfo)
      .then((response) => {
        this.infoTabela = response["rows"];
      })
      .catch((err) => {
        res.dismiss();
        this.utils.showAlert('Erro!', '', 'Erro ao buscar lançamentos. Mensagem:' + err, ['OK']);
      });

      res.dismiss();
    });
  }

  filtrar(){
    this.loadingCtr.create({
      message: 'Carregando',
      spinner: 'dots',
    }).then((res) => {
      res.present();

      let arrFilters = this.filterToArray();
      this.TbLancamento.getLancamentos(arrFilters).then((response) => {
        // response["limit"] | response["offset"]
        res.dismiss();
        this.infoTabela = response["rows"];
      }).catch((err) => {
        res.dismiss();
        this.utils.showAlert('Erro!', '', 'Erro ao filtrar lançamentos. Mensagem:' + err, ['OK']);
      });

      res.onDidDismiss().then((dis) => { });
    });
  }

  clearInput(element){
    this.frmFiltros[element] = '';
  }

  private filterToArray(){
    let vMesBase = '';
    if(this.frmFiltros.mes_base != ""){
      vMesBase = this.utils.formatDate(this.frmFiltros.mes_base, 'MM');
    }

    let vAnoBase = '';
    if(this.frmFiltros.mes_base != ""){
      vAnoBase = this.utils.formatDate(this.frmFiltros.mes_base, 'YYYY');
    }

    let vVctoIni = '';
    if(this.frmFiltros.vcto_inicial != ""){
      vVctoIni = this.utils.formatDate(this.frmFiltros.vcto_inicial, 'YYYY-MM-DD');
    }

    let vVctoFim = '';
    if(this.frmFiltros.vcto_final != ""){
      vVctoFim = this.utils.formatDate(this.frmFiltros.vcto_final, 'YYYY-MM-DD');
    }

    let vPgtoIni = '';
    if(this.frmFiltros.pgto_inicial != ""){
      vPgtoIni = this.utils.formatDate(this.frmFiltros.pgto_inicial, 'YYYY-MM-DD');
    }

    let vPgtoFim = '';
    if(this.frmFiltros.pgto_final != ""){
      vPgtoFim = this.utils.formatDate(this.frmFiltros.pgto_final, 'YYYY-MM-DD');
    }

    let arrFilters = [
      {
        mesBase     : vMesBase,
        anoBase     : vAnoBase,
        vctoIni     : vVctoIni,
        vctoFim     : vVctoFim,
        pgtoIni     : vPgtoIni,
        pgtoFim     : vPgtoFim,
        descricao   : this.frmFiltros.descricao,
        conta       : this.frmFiltros.conta,
        tipo        : this.frmFiltros.tipo,
        categoria   : this.frmFiltros.categoria,
        apenasPagas : this.frmFiltros.exibir,
        limit       : '',
        offset      : '',
        //limit       : this.limit,
        //offset      : this.offset,
        appkey      : this.appKey,
      }
    ];

    return arrFilters[0];
  }

  async showModalEditLcto(values, itensBaseDespesa = [], itensConta = []){
    const modal = await this.modalController.create({
      component: PageLancamentoEditPage,
      componentProps: { arrVariaveis: values, itensBaseDespesa: itensBaseDespesa, itensConta: itensConta }
    });

    modal.onDidDismiss().then((detail) => {
       console.log(detail);
    });

    return await modal.present();
  }

  editLcto(lanId){
    this.TbLancamento.getLancamento(lanId).then((response) => {
      this.showModalEditLcto(response, this.itensBaseDespesa, this.itensConta);
    }).catch((err) => {
      this.utils.showAlert('Erro!', '', 'Erro ao buscar lançamento. Mensagem:' + err, ['OK']);
    });
  }
}
