import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { MatExpansionModule } from '@angular/material/expansion';

import { PageLancamentosPage } from './page-lancamentos.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: PageLancamentosPage,
    children:
      [
        {
          path: 'home',
          children:
            [
              {
                path: '',
                loadChildren: '../page-lancamentos-home/page-lancamentos-home.module#PageLancamentosHomePageModule'
              }
            ]
        },
        {
          path: 'totais',
          children:
            [
              {
                path: '',
                loadChildren: '../page-lancamentos-totais/page-lancamentos-totais.module#PageLancamentosTotaisPageModule'
              }
            ]
        },
        {
          path: '',
          redirectTo: 'tabs/home',
          pathMatch: 'full'
        }
      ]
  },
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatExpansionModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PageLancamentosPage]
})
export class PageLancamentosPageModule {}
