import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-tab-user2',
  templateUrl: './tab-user2.page.html',
  styleUrls: ['./tab-user2.page.scss'],
})
export class TabUser2Page implements OnInit {

  public empresas : [];
  public status;

  constructor(private menuCtrl : MenuController,
              private _usuarioService : UsuarioService) { }

  ngOnInit() {
    this.menuCtrl.enable(true, "primerMenu");
    this.menuCtrl.enable(false, "segundoMenu");
    this.getEmpresas();
  }

  getEmpresas(){
    this._usuarioService.getEmpresas().subscribe(
      response => {
        this.empresas = response.empresas;
        console.log(response.empresas)
      },
      error => {
        if(error){
          console.log(<any>error);
          this.status = 'error';
        }
      }
    )
  }

}
