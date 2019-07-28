import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Empresa } from 'src/app/models/empresa.model';

@Component({
  selector: 'app-tab-admin2',
  templateUrl: './tab-admin2.page.html',
  styleUrls: ['./tab-admin2.page.scss'],
})
export class TabAdmin2Page implements OnInit {

  public empresas: Empresa;
  public status;
  public textoBuscar = '';

  constructor(private menuCtrl : MenuController, private _usuarioService: UsuarioService) { }

  ngOnInit() {
    this.menuCtrl.enable(false, "primerMenu");
    this.menuCtrl.enable(false, "segundoMenu");
    this.menuCtrl.enable(true, "tercerMenu");
    this.getEmpresas();
  }

  getEmpresas() {
    this._usuarioService.getEmpresas().subscribe(
      response => {
        console.log(response.empresas);
        this.empresas = response.empresas;
        // this.usuarios.push( ...response.usuarios );
      },
      error => {
        if (error) {
          console.log(<any>error);
          this.status = 'error';
        }
      }
    );
  }


  buscar(event){
    this.textoBuscar = event.detail.value;
  }

}