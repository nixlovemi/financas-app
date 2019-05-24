import { Component, OnInit } from '@angular/core';
import { ContaService } from '../TbConta/conta.service';
import { BaseDespesaService } from '../TbBaseDespesa/base-despesa.service';
import { UtilsService } from '../utils.service';

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

  constructor(public TbConta: ContaService, public TbBaseDespesa: BaseDespesaService, public utils: UtilsService) {
    let today = new Date().toISOString();
    this.frmFiltros.mes_base = today;
  }

  ngOnInit() {

  }

  ionViewWillEnter(){
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
      this.utils.showAlert('Erro!', '', 'Erro ao buscar contas. Mensagem:' + err, ['OK']);
    });
  }

  filtrar(){
    console.log(this.frmFiltros);
  }

  clearInput(element){
    this.frmFiltros[element] = '';
  }
}
