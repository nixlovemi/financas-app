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
  itensCategoriaTotal = [];
  itensCategoriaTotalSum = [];
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

        this.infoTotais.receita_total_valor      = this.utils.formatMoney(response["totais"]["receita"]);
        this.infoTotais.receita_total_pago       = this.utils.formatMoney(response["totais"]["receitaPaga"]);
        this.infoTotais.receita_total_nao_contab = this.utils.formatMoney(response["totais"]["receitaNaoContabiliza"]);
        this.infoTotais.despesa_total_pago       = this.utils.formatMoney(response["totais"]["despesa"]);
        this.infoTotais.despesa_total_valor      = this.utils.formatMoney(response["totais"]["despesaPaga"]);
        this.infoTotais.despesa_total_nao_contab = this.utils.formatMoney(response["totais"]["despesaNaoContabiliza"]);
      })
      .catch((err) => {
        res.dismiss();
        this.utils.showAlert('Erro!', '', 'Erro ao buscar lançamentos. Mensagem:' + err, ['OK']);
      });

      this.TbLancamento.getCategoriaGastos(this.utils.formatDate(this.frmFiltros.mes_base, 'MM'), this.utils.formatDate(this.frmFiltros.mes_base, 'YYYY'))
      .then((response) => {
        this.itensCategoriaTotal    = response;
        this.itensCategoriaTotalSum = this.somaTotaisCatGastos(this.itensCategoriaTotal);
      })
      .catch((err) => {
        res.dismiss();
        this.utils.showAlert('Erro!', '', 'Erro ao buscar categoria totais. Mensagem:' + err, ['OK']);
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

  somaTotaisCatGastos(itensCategoriaTotal){
    // total fixos
    var sumFixosPrev = 0;
    var sumFixosReal = 0;
    var sumFixosDif  = 0;
    itensCategoriaTotal["arrFixos"].forEach(item => {
      var vlrPrev = parseFloat(item.vlrPrevisto);
      var vlrReal = parseFloat(item.vlrRealizado);

      sumFixosPrev = sumFixosPrev + vlrPrev;
      sumFixosReal = sumFixosReal + vlrReal;
      sumFixosDif  = sumFixosDif + (vlrPrev - vlrReal);
    });
    // ===========

    // total variaveis
    var sumVariaveisPrev = 0;
    var sumVariaveisReal = 0;
    var sumVariaveisDif  = 0;
    itensCategoriaTotal["arrVariaveis"].forEach(item => {
      var vlrPrev = parseFloat(item.vlrPrevisto);
      var vlrReal = parseFloat(item.vlrRealizado);

      sumVariaveisPrev = sumVariaveisPrev + vlrPrev;
      sumVariaveisReal = sumVariaveisReal + vlrReal;
      sumVariaveisDif  = sumVariaveisDif + (vlrPrev - vlrReal);
    });
    // ===============

    // total investimento
    var sumInvestPrev = 0;
    var sumInvestReal = 0;
    var sumInvestDif  = 0;
    itensCategoriaTotal["arrInvestimento"].forEach(item => {
      var vlrPrev = parseFloat(item.vlrPrevisto);
      var vlrReal = parseFloat(item.vlrRealizado);

      sumInvestPrev = sumInvestPrev + vlrPrev;
      sumInvestReal = sumInvestReal + vlrReal;
      sumInvestDif  = sumInvestDif + (vlrPrev - vlrReal);
    });
    // =================

    return {
      arrFixos: {
        totalPrevisto           : sumFixosPrev,
        totalPrevistoFormatado  : this.utils.formatMoney(sumFixosPrev),
        totalRealizado          : sumFixosReal,
        totalRealizadoFormatado : this.utils.formatMoney(sumFixosReal),
        totalDiferenca          : sumFixosDif,
        totalDiferencaFormatado : this.utils.formatMoney(sumFixosDif),
      },
      arrVariaveis: {
        totalPrevisto           : sumVariaveisPrev,
        totalPrevistoFormatado  : this.utils.formatMoney(sumVariaveisPrev),
        totalRealizado          : sumVariaveisReal,
        totalRealizadoFormatado : this.utils.formatMoney(sumVariaveisReal),
        totalDiferenca          : sumVariaveisDif,
        totalDiferencaFormatado : this.utils.formatMoney(sumVariaveisDif),
      },
      arrInvestimento: {
        totalPrevisto           : sumInvestPrev,
        totalPrevistoFormatado  : this.utils.formatMoney(sumInvestPrev),
        totalRealizado          : sumInvestReal,
        totalRealizadoFormatado : this.utils.formatMoney(sumInvestReal),
        totalDiferenca          : sumInvestDif,
        totalDiferencaFormatado : this.utils.formatMoney(sumInvestDif),
      },
    };
  }
}
