import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { CurrencyPipe } from '@angular/common';
import { LancamentoService } from '../TbLancamento/lancamento.service';
import { ContaService } from '../TbConta/conta.service';
import { UtilsService } from '../utils.service';
import { GlobalsService } from '../globals.service';
import { PageLancamentoEditPage } from '../page-lancamento-edit/page-lancamento-edit.page';

@Component({
  selector: 'app-page-lancamentos-totais',
  templateUrl: './page-lancamentos-totais.page.html',
  styleUrls: ['./page-lancamentos-totais.page.scss'],
})
export class PageLancamentosTotaisPage implements OnInit {
  itensCategoriaTotal    = [];
  itensCategoriaTotalSum = [];
  fixosTotalPrevisto     = '';
  fixosTotalRealizado    = '';
  fixosTotalDiferenca    = '';
  variavTotalPrevisto    = '';
  variavTotalRealizado   = '';
  variavTotalDiferenca   = '';
  investTotalPrevisto    = '';
  investTotalRealizado   = '';
  investTotalDiferenca   = '';

  vTotPrevisto;
  vTotRealizado;
  vTotDiferenca;
  vArrSaldoContas   = [];
  vTotalSaldoContas = 0;

  constructor(
    public utils: UtilsService,
    public TbLancamento: LancamentoService,
    public TbConta: ContaService,
    public loadingCtr: LoadingController,
    public globals: GlobalsService,
    public currencyPipe: CurrencyPipe,
  ) {  }

  ngOnInit() { }

  ionViewWillEnter()
  {
    this.loadingCtr.create({
      message: 'Carregando',
      spinner: 'dots',
    }).then((res) => {
      res.present();

      let mes = this.utils.formatDate(this.globals.getPgLctoMesBase(), 'MM');
      let ano = this.utils.formatDate(this.globals.getPgLctoMesBase(), 'YYYY');

      this.carregaCategoriaGastos(mes, ano);
      this.carregaSaldoContas(mes, ano);
      res.dismiss();
    });
  }

  carregaSaldoContas(mes, ano)
  {
    this.TbConta.getSaldoContas(mes, ano)
    .then((response: any[]) => {
      this.vArrSaldoContas = response;

      this.vTotalSaldoContas = 0;
      for(let idx in this.vArrSaldoContas){
        var item = this.vArrSaldoContas[idx];
        this.vTotalSaldoContas = this.vTotalSaldoContas + item["saldo"];
      }
    })/*
    .catch((err) => {
      res.dismiss();
      this.utils.showAlert('Erro!', '', 'Erro ao buscar categoria totais. Mensagem:' + err, ['OK']);
    })*/;
  }

  carregaCategoriaGastos(mes, ano)
  {
    this.TbLancamento.getCategoriaGastos(mes, ano)
    .then((response: any[]) => {
      this.itensCategoriaTotal    = response;
      this.itensCategoriaTotalSum = this.somaTotaisCatGastos(this.itensCategoriaTotal);

      this.fixosTotalPrevisto  = this.itensCategoriaTotalSum[0].arrFixos.totalPrevistoFormatado;
      this.fixosTotalRealizado = this.itensCategoriaTotalSum[0].arrFixos.totalRealizadoFormatado;
      this.fixosTotalDiferenca = this.itensCategoriaTotalSum[0].arrFixos.totalDiferencaFormatado;

      this.variavTotalPrevisto  = this.itensCategoriaTotalSum[0].arrVariaveis.totalPrevistoFormatado;
      this.variavTotalRealizado = this.itensCategoriaTotalSum[0].arrVariaveis.totalRealizadoFormatado;
      this.variavTotalDiferenca = this.itensCategoriaTotalSum[0].arrVariaveis.totalDiferencaFormatado;

      this.investTotalPrevisto  = this.itensCategoriaTotalSum[0].arrInvestimento.totalPrevistoFormatado;
      this.investTotalRealizado = this.itensCategoriaTotalSum[0].arrInvestimento.totalRealizadoFormatado;
      this.investTotalDiferenca = this.itensCategoriaTotalSum[0].arrInvestimento.totalDiferencaFormatado;
    })/*
    .catch((err) => {
      res.dismiss();
      this.utils.showAlert('Erro!', '', 'Erro ao buscar categoria totais. Mensagem:' + err, ['OK']);
    })*/;
  }

  somaTotaisCatGastos(itensCategoriaTotal)
  {
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

    this.vTotPrevisto  = sumFixosPrev + sumVariaveisPrev + sumInvestPrev;
    this.vTotRealizado = sumFixosReal + sumVariaveisReal + sumInvestReal;
    this.vTotDiferenca = sumFixosDif + sumVariaveisDif + sumInvestDif;

    return [{
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
    }];
  }
}
