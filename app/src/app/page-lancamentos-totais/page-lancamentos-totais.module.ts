import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PageLancamentosTotaisPage } from './page-lancamentos-totais.page';

const routes: Routes = [
  {
    path: '',
    component: PageLancamentosTotaisPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PageLancamentosTotaisPage]
})
export class PageLancamentosTotaisPageModule {}
