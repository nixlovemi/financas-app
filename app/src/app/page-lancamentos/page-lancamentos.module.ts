import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { MatExpansionModule } from '@angular/material/expansion';

import { PageLancamentosPage } from './page-lancamentos.page';

const routes: Routes = [
  {
    path: '',
    component: PageLancamentosPage
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
