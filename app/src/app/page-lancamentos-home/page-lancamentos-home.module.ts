import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { MatExpansionModule } from '@angular/material/expansion';

import { PageLancamentosHomePage } from './page-lancamentos-home.page';

const routes: Routes = [
  {
    path: '',
    component: PageLancamentosHomePage
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
  declarations: [PageLancamentosHomePage]
})
export class PageLancamentosHomePageModule {}
