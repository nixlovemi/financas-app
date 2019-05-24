import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomeIndexPage } from './home-index.page';

const routes: Routes = [
  {
    path: '',
    component: HomeIndexPage,
    children: [
      { path: 'page-inicio', loadChildren: '../page-inicio/page-inicio.module#PageInicioPageModule' },
      { path: 'page-lancamentos', loadChildren: '../page-lancamentos/page-lancamentos.module#PageLancamentosPageModule' },
    ]
  }
  /*
  NAO CONSEGUI FAZER O REDIRECT
  NO LOGIN JOGUEI PRA PRIM PAGINA DO MENU
  {
    path: '',
    redirectTo: '/homeIndex/page-inicio'
  }
  */
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomeIndexPage]
})
export class HomeIndexPageModule {}
