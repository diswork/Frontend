import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Empresa } from 'src/app/models/empresa.model';
import { GLOBAL } from 'src/app/services/global.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-tab-user2',
  templateUrl: './tab-user2.page.html',
  styleUrls: ['./tab-user2.page.scss'],
})
export class TabUser2Page implements OnInit {

  public empresas : [];
  public status;
  public textoBuscar = '';
  public dataUser : User;
  public empresaSeguir: Empresa;
  public url : String;

  constructor(
    private menuCtrl : MenuController,
    private _usuarioService : UsuarioService
  ) 
  {  
    this.url = GLOBAL.url;
    this.getEmpresas();
    this.dataUser = this._usuarioService.getUserLog();
    console.log(this.dataUser.empresas)
  }

  ngOnInit() {
    this.menuCtrl.enable(true, "primerMenu");
    this.menuCtrl.enable(false, "segundoMenu");
    this.menuCtrl.enable(false, "tercerMenu");

    
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
        this._usuarioService.guardarToken(response.token)
      },
      error=>{
        if(error){
          console.log(<any>error);
          this.status = 'error';
        }
      }
    )
  }

  dejarSeguirEmpresa(id){
    this._usuarioService.dejarSeguirEmpresa(id, this.empresaSeguir).subscribe(
      response => {
        this._usuarioService.registrarUser(response.usuario);
        console.log(response.usuario)
        this.dataUser = response.usuario;
        this._usuarioService.guardarToken(response.token)
      },
      error=>{
        if(error){
          console.log(<any>error);
          this.status = 'error';
        }
      }
    )
  }

  coincidencia(empresa : string){
    let hay : boolean = false;
    
      if(JSON.stringify(this.dataUser.empresas).includes(empresa)){
        hay = true;
      }
    
    return hay;
  }


  
}
