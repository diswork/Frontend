import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Empresa } from 'src/app/models/empresa.model';

@Component({
  selector: 'app-tab-user2',
  templateUrl: './tab-user2.page.html',
  styleUrls: ['./tab-user2.page.scss'],
})
export class TabUser2Page implements OnInit {

  public empresas : [];
  public status;
  public textoBuscar = '';
  public dataUser;
  public empresaSeguir: Empresa;

  constructor(private menuCtrl : MenuController,
              private _usuarioService : UsuarioService) {    this.getEmpresas();   }

  ngOnInit() {
    this.menuCtrl.enable(true, "primerMenu");
    this.menuCtrl.enable(false, "segundoMenu");
    this.menuCtrl.enable(false, "tercerMenu");

    this.dataUser = this._usuarioService.getUserLog();
  }

  getEmpresas(){
    this._usuarioService.getEmpresas().subscribe(
      response => {
        this.empresas = response.empresas;
      },
      error => {
        if(error){
          console.log(<any>error);
          this.status = 'error';
        }
      }
    )
  }

  buscar(event){
    this.textoBuscar = event.detail.value;
  }

  seguirEmpresa(id){
    this._usuarioService.seguirEmpresa(id, this.empresaSeguir).subscribe(
      response => {
        this._usuarioService.registrarUser(response.usuario);
        console.log(response.usuario)
        this.dataUser = response.usuario;
      },
      error=>{
        if(error){
          console.log(<any>error);
          this.status = 'error';
        }
      }
    )
  }


  
}
