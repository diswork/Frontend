import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, AlertController, IonList } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Admin } from 'src/app/models/admin.model';
import { GLOBAL } from 'src/app/services/global.service';

@Component({
  selector: 'app-modal-gestionar-administradores',
  templateUrl: './modal-gestionar-administradores.page.html',
  styleUrls: ['./modal-gestionar-administradores.page.scss'],
})
export class ModalGestionarAdministradoresPage implements OnInit {

  @ViewChild('cerrarLista') lista: IonList;

  public admins: Admin
  public newAdmin: Admin
  public editando = false
  public textoBuscar = ''
  public url;


  constructor(private modalCtrl: ModalController, private _adminService: UsuarioService, private alertCtrl: AlertController) {
    this.newAdmin = new Admin('', '', '', '', '', '', '')
    this.url = GLOBAL.url;

  }

  ngOnInit() {
    this.getAdmins();
  }

  salir() {
    this.modalCtrl.dismiss();
  }

  activarEdicion() {
    this.editando = true


  }

  desactivarEdicion() {
    this.editando = false

  }

  buscar(event) {
    this.textoBuscar = event.detail.value;
  }

  async openDeleteAlert(id) {
    var identificador = id
    const alert = await this.alertCtrl.create({
      header: 'Eliminar Administrador',
      buttons: [{
        text: 'Si',
        role: 'Si',
        cssClass: 'secondary',
        handler: () => {
          this.deleteAdmin(identificador)
          this.lista.closeSlidingItems()

        }
      },
      {
        text: 'No',
        handler: () => {
          this.lista.closeSlidingItems()
        }
      }
      ]
    });
    alert.onDidDismiss().then(() => {
      this.getAdmins();
    })
    alert.present();
  }


  getAdmins() {
    this._adminService.getAdmins().subscribe(
      response => {
        if (response.admins) {
          this.admins = response.admins
        }
      },
      error => {
        if (error) {
          console.log(<any>error);

        }
      }
    )
  }

  addAdmin() {
    this._adminService.crearAdmin(this.newAdmin).subscribe(
      response => {
        if (response.admin) {
          this.editando = false;
          this.getAdmins();
        }
      },
      error => {
        if (error) {
          console.log(<any>error);

        }
      }
    )
  }

  deleteAdmin(id) {
    this._adminService.deleteAdmin(id).subscribe(
      response => {
        if (response.admin) {
          this.getAdmins();
        }
      },
      error => {
        if (error) {
          console.log(<any>error);
        }
      }
    )
  }

}
