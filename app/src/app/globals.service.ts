import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  mesBase          = '';
  itensConta       = [];
  itensBaseDespesa = [];

  constructor() { }

  getPgLctoMesBase(){
    return this.mesBase;
  }
  setPgLctoMesBase(mesBase){
    this.mesBase = mesBase;
  }

  getItensBaseDespesa(){
    return this.itensBaseDespesa;
  }
  setItensBaseDespesa(itensBaseDespesa){
    this.itensBaseDespesa = itensBaseDespesa;
  }

  getItensConta(){
    return this.itensConta;
  }
  setItensConta(itensConta){
    this.itensConta = itensConta;
  }
}
