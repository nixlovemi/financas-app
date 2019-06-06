import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  mesBase = '';

  constructor() { }

  getPgLctoMesBase(){
    return this.mesBase;
  }
  setPgLctoMesBase(mesBase){
    this.mesBase = mesBase;
  }
}
