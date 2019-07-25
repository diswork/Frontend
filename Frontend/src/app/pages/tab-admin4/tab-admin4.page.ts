import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/models/admin.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NgForm } from '@angular/forms';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { MenuController, ModalController, LoadingController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { GLOBAL } from 'src/app/services/global.service';
import { UploadService } from 'src/app/services/upload.service';
import { ModalUserPage } from '../modal-user/modal-user.page';

@Component({
  selector: 'app-tab-admin4',
  templateUrl: './tab-admin4.page.html',
  styleUrls: ['./tab-admin4.page.scss'],
})
export class TabAdmin4Page implements OnInit {

  admin : Admin;
  public habilitarEdicion : boolean;
  public status;  
  public categorias : [];
  public nivelesAcademicos : [];
  public url;
  public token;
  
  constructor(
    private _adminService : UsuarioService,
    private uiService: UiServiceService,
    private menuCtrl : MenuController,
    private actionSheetController: ActionSheetController,
    private _uploadService : UploadService, 
    private modalCtrl : ModalController,
    public loadingController: LoadingController
  )
  { 
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.menuCtrl.enable(false, "primerMenu");
    this.menuCtrl.enable(false, "segundoMenu");
    this.menuCtrl.enable(true, "tercerMenu");
    this.admin = this._adminService.getAdminLog();
    this.getCategorias();
    this.getNivelesAcademicos();
  }

  habilito(){
    this.habilitarEdicion = true;
  }

  desHabilito(){
    this.habilitarEdicion = false;
  }


  //opciones de imagen
  /*async opcionesDeImagen() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [{
        text: 'Ver',
        icon: 'contact',
        handler: async () => {
          console.log('Ver foto');
          const modal = await this.modalCtrl.create({
            component : ModalUserPage,
            componentProps : {
              nombre : this.usuario.nickName,
              image : this.usuario.image,
              editar : false
            },
            animated : true
          });
          await modal.present();
        }
      }, {
        text: 'Actualizar',
        icon: 'create',
        handler: () => {
          console.log('Actualizar foto');
          this.editarFoto();
        }
      }, {
        text: 'Eliminar',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Eliminar foto');
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  
  loading : any;
  async editarFoto(){
    const modal = await this.modalCtrl.create({
      component : ModalUserPage,
      componentProps : {
        nombre : this.usuario.nickName,
        image : this.usuario.image,
        editar : true
      },
      animated : true
    });
    await modal.present();

    const {data} = await modal.onDidDismiss();
    
    this.presentLoading('espere...')

    setTimeout(()=>{
      this.loading.dismiss();
      this.usuario.image = this._usuarioService.getUserLog().image;
    }, 2000)
  }

  async presentLoading(message : string) {
     this.loading = await this.loadingController.create({
      message
    });
    return this.loading.present();
  }*/

}
