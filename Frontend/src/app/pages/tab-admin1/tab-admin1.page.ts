import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { User } from 'src/app/models/user.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ModalAdminUserPage } from '../modal-admin-user/modal-admin-user.page';
import { GLOBAL } from '../../services/global.service';



@Component({
  selector: 'app-tab-admin1',
  templateUrl: './tab-admin1.page.html',
  styleUrls: ['./tab-admin1.page.scss'],
})
export class TabAdmin1Page implements OnInit {

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
    this.menuCtrl.enable(false, "segundoMenu");
    this.menuCtrl.enable(true, "tercerMenu");
    this.getUsuarios();
    // this.dataUser = this._usuarioService.getUserLog();
  }

 async abrirModal() {
    const modal = await this.modalCtrl.create({
      component : ModalAdminUserPage,
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
    this._usuarioService.getUsers().subscribe(
      response => {
        console.log(response.usuarios);
        this.usuarios = response.usuarios;
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

  deleteUser(id){
    this._usuarioService.deleteUser(id).subscribe(
      response => {
        console.log(response.usuario);
        this.getUsuarios();
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
