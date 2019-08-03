import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { User } from 'src/app/models/user.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { GLOBAL } from 'src/app/services/global.service';
import { ModalEmpresaUserPage } from '../modal-empresa-user/modal-empresa-user.page';

@Component({
  selector: 'app-tab-empresa2',
  templateUrl: './tab-empresa2.page.html',
  styleUrls: ['./tab-empresa2.page.scss'],
})
export class TabEmpresa2Page implements OnInit {

  usuario: User;
  public usuarios: User;
  public status;
  public dataUser;
  public textoBuscar = '';
  public url;

  constructor(private menuCtrl: MenuController, private _usuarioService: UsuarioService, 
              private modalCtrl: ModalController) { 
                this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.menuCtrl.enable(false, "primerMenu");
    this.menuCtrl.enable(true, "segundoMenu");
    this.menuCtrl.enable(false, "tercerMenu");
    this.getUsuarios();
    // this.dataUser = this._usuarioService.getUserLog();
  }
  
  async abrirModal() {
    const modal = await this.modalCtrl.create({
      component : ModalEmpresaUserPage,
      componentProps : {
        nombre : this.usuario.nickName,
        email : this.usuario.email,
        telefono : this.usuario.telefono,
        departamento : this.usuario.departamento,
        institucion : this.usuario.institucion,
        fechaNacimiento : this.usuario.fechaNacimiento,
        image : this.usuario.image
      },
      animated : true
    });
    await modal.present();
  }

  
  getUsuario(id) {
  
      this._usuarioService.getUser(id).subscribe(
        response => {
          if (response.user) {
            this.status = 'Ok';
            this.usuario = response.user;
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



  getUsuarios() {
    setTimeout(() => {
      this._usuarioService.getUsuariosPorEmpresa().subscribe(
        response => {
          console.log(response.followersU);
          this.usuarios = response.followersU;
          // this.usuarios.push( ...response.usuarios );
        },
        error => {
          if (error) {
            console.log(<any>error);
            this.status = 'error';
          }
        }
      );
    }, 1000)
  }


  buscar(event){
    this.textoBuscar = event.detail.value;
  }

}
