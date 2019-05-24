import { LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { UsuarioService } from '../TbUsuario/usuario.service';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  frmLogin = {
    usuario: '',
    senha: ''
  };

  constructor(
    public loadingCtr: LoadingController,
    public TbUsuario: UsuarioService,
    public utils: UtilsService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login(){
    this.loadingCtr.create({
      message: 'Carregando',
      spinner: 'dots',
    }).then((res) => {
      res.present();

      this.TbUsuario.doLogin(this.frmLogin.usuario, this.frmLogin.senha)
      .then((response) => {
        res.dismiss();

        let error     = response["error"];
        let usu_id    = response["usu_id"];
        let usu_nome  = response["usu_nome"];
        let usu_email = response["usu_email"];
        let usu_ativo = response["usu_ativo"];

        if(error == true || usu_ativo == false){
          this.utils.showAlert('Erro!', '', 'Usuário ou senha inválidos!', ['OK']);
        } else {
          this.router.navigate(['/homeIndex/page-inicio']);
        }
      })
      .catch((err) => {
        res.dismiss();

        this.utils.showAlert('Erro!', '', 'Erro ao fazer login. Mensagem:' + err, ['OK']);
      });

      res.onDidDismiss().then((dis) => { });
    });
  }

}
