import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, PopoverController } from '@ionic/angular';
import { ContaService } from '../TbConta/conta.service';
import { BaseDespesaService } from '../TbBaseDespesa/base-despesa.service';
import { LancamentoService } from '../TbLancamento/lancamento.service';
import { UtilsService } from '../utils.service';
import { GlobalsService } from '../globals.service';
import { PageLancamentoEditPage } from '../page-lancamento-edit/page-lancamento-edit.page';
import { PageLancamentoHomeAddMenuComponent } from '../page-lancamento-home-add-menu/page-lancamento-home-add-menu.component';

@Component({
  selector: 'app-page-lancamentos-home',
  templateUrl: './page-lancamentos-home.page.html',
  styleUrls: ['./page-lancamentos-home.page.scss'],
})
export class PageLancamentosHomePage implements OnInit {

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
  itensCategoriaTotal = [];
  itensCategoriaTotalSum = [];
  itensTipo        = [
    {id: 'R', text: 'Receita'},
    {id: 'D', text: 'Despesa'},
  ];
  itensExibir      = [
    {id: '', text: 'Todos os Lançamentos'},
    {id: 'S', text: 'Apenas Pagos'},
    {id: 'N', text: 'Apenas Não Pagos'},
  ];
  infoTotais = [
    {
      receita_total_valor: '',
      receita_total_pago: '',
      receita_total_nao_contab: '',
      despesa_total_pago: '',
      despesa_total_valor: '',
      despesa_total_nao_contab: '',
    }
  ] as any;
  infoTabela = [];
  appKey = '';

  constructor(
    public TbConta: ContaService,
    public TbBaseDespesa: BaseDespesaService,
    public utils: UtilsService,
    public TbLancamento: LancamentoService,
    public loadingCtr: LoadingController,
    public modalController: ModalController,
    public globals: GlobalsService,
    public popoverCtrl: PopoverController,
  ) {
    let today = new Date().toISOString();
    this.frmFiltros.mes_base = today;
    this.appKey = this.utils.getAppKey();

    this.globals.setPgLctoMesBase(this.frmFiltros.mes_base);
  }

  ngOnInit() { }

  carregaContasWS(){
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

      this.globals.setItensConta(this.itensConta);
    })/*
    .catch((err) => {
      res.dismiss();
      this.utils.showAlert('Erro!', '', 'Erro ao buscar contas. Mensagem:' + err, ['OK']);
    })*/;
  }

  carregaDespesasWS(){
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

      this.globals.setItensBaseDespesa(this.itensBaseDespesa);
    })/*
    .catch((err) => {
      res.dismiss();
      this.utils.showAlert('Erro!', '', 'Erro ao buscar contas. Mensagem:' + err, ['OK']);
    })*/;
  }

  carregaLancamentos(arrInfo){
    this.TbLancamento.getLancamentos(arrInfo)
    .then((response) => {
      this.infoTabela = response["rows"];

      this.infoTotais.receita_total_valor      = this.utils.formatMoney(response["totais"]["receita"]);
      this.infoTotais.receita_total_pago       = this.utils.formatMoney(response["totais"]["receitaPaga"]);
      this.infoTotais.receita_total_nao_contab = this.utils.formatMoney(response["totais"]["receitaNaoContabiliza"]);
      this.infoTotais.despesa_total_pago       = this.utils.formatMoney(response["totais"]["despesa"]);
      this.infoTotais.despesa_total_valor      = this.utils.formatMoney(response["totais"]["despesaPaga"]);
      this.infoTotais.despesa_total_nao_contab = this.utils.formatMoney(response["totais"]["despesaNaoContabiliza"]);
    })/*
    .catch((err) => {
      res.dismiss();
      this.utils.showAlert('Erro!', '', 'Erro ao buscar lançamentos. Mensagem:' + err, ['OK']);
    })*/;
  }

  ionViewWillEnter(){
    this.loadingCtr.create({
      message: 'Carregando',
      spinner: 'dots',
    }).then((res) => {
      res.present();

      this.carregaContasWS();
      this.carregaDespesasWS();

      let arrInfo = this.filterToArray();
      this.carregaLancamentos(arrInfo);

      res.dismiss();
    });
  }

  filtrar(){
    this.globals.setPgLctoMesBase(this.frmFiltros.mes_base);

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

        this.infoTotais.receita_total_valor      = this.utils.formatMoney(response["totais"]["receita"]);
        this.infoTotais.receita_total_pago       = this.utils.formatMoney(response["totais"]["receitaPaga"]);
        this.infoTotais.receita_total_nao_contab = this.utils.formatMoney(response["totais"]["receitaNaoContabiliza"]);
        this.infoTotais.despesa_total_pago       = this.utils.formatMoney(response["totais"]["despesa"]);
        this.infoTotais.despesa_total_valor      = this.utils.formatMoney(response["totais"]["despesaPaga"]);
        this.infoTotais.despesa_total_nao_contab = this.utils.formatMoney(response["totais"]["despesaNaoContabiliza"]);
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
       this.filtrar();
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

  async showAddMenu(ev: any) {
    const popover = await this.popoverCtrl.create({
        component: PageLancamentoHomeAddMenuComponent,
        event: ev,
        translucent: true
    });

    popover.onDidDismiss().then((data) => {
      this.filtrar();
    });

    return await popover.present();
  }
}
