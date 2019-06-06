import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'homeIndex', loadChildren: './home-index/home-index.module#HomeIndexPageModule' },
  { path: 'lancamentoEdit', loadChildren: './page-lancamento-edit/page-lancamento-edit.module#PageLancamentoEditPageModule' },
  { path: 'page-lancamentos-home', loadChildren: './page-lancamentos-home/page-lancamentos-home.module#PageLancamentosHomePageModule' },
  { path: 'page-lancamentos-totais', loadChildren: './page-lancamentos-totais/page-lancamentos-totais.module#PageLancamentosTotaisPageModule' },
  /*{ path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },*/
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
