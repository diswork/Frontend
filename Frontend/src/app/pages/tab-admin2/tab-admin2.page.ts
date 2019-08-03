import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Empresa } from 'src/app/models/empresa.model';
import { ModalAdminEmpresaPage } from '../modal-admin-empresa/modal-admin-empresa.page';
import { GLOBAL } from 'src/app/services/global.service';

@Component({
  selector: 'app-tab-admin2',
  templateUrl: './tab-admin2.page.html',
  styleUrls: ['./tab-admin2.page.scss'],
})
export class TabAdmin2Page implements OnInit {

  public empresas;
  public empresa: Empresa;
  public mensaje = false;
  public status;
  public textoBuscar = '';
  public url;

  constructor(private menuCtrl : MenuController, private _usuarioService: UsuarioService,
              private modalCtrl: ModalController) {
                this.url = GLOBAL.url;
              }

  ngOnInit() {
    this.menuCtrl.enable(false, "primerMenu");
    this.menuCtrl.enable(false, "segundoMenu");
    this.menuCtrl.enable(true, "tercerMenu");
    this.empresas = [];
    this.mensaje = true;
    // this.getEmpresas();
  }
  async abrirModal() {
    const modal = await this.modalCtrl.create({
      component : ModalAdminEmpresaPage,
      componentProps : {
        nombre : this.empresa.nombre,
        email : this.empresa.email,
        direccion : this.empresa.direccion,
        telefono : this.empresa.telefono,
        image : this.empresa.image
      },
      animated : true
    });
    await modal.present();
  }
  getEmpresa(id) {
    this._usuarioService.getEmpresa(id).subscribe(
      response => {
        if (response.empresa) {
          this.status = 'Ok';
          this.empresa = response.empresa;
          this.abrirModal();
        }
      },
      error => {
        if (error) {
          console.log(<any>error);
          this.status = 'error';
        }
      }
    );
}

doRefresh(event){
  this.empresas = [];
  this.mensaje = false;
  setTimeout(() => {
    this._usuarioService.getEmpresas().subscribe(
      response => {
        if(response.message === 'no') {
          this.mensaje = true;
          event.target.complete();
        } else if (response.empresas.length === 0) {
          this.mensaje = true;
          event.target.complete();
        } else if (response.empresas.length > 0) {
          this.empresas = response.empresas;
          event.target.complete();
        }
      },
      error => {
        if (error) {
          console.log(<any>error);
          this.status = "no"
        }
      }
    )
  }, 2500);
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

  deleteEmpresa(id){
    this._usuarioService.deleteEmpresa(id).subscribe(
      response => {
        console.log(response.empresa);
        this.getEmpresas();
      },
      error=>{
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

}