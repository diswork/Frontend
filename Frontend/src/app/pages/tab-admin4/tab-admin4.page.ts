import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/models/admin.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NgForm } from '@angular/forms';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { MenuController, ModalController, LoadingController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { GLOBAL } from 'src/app/services/global.service';
import { UploadService } from 'src/app/services/upload.service';
import { ModalAdminPage } from '../modal-admin/modal-admin.page';

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
  public adminActualizado = false;
  public listo = true;
  
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
  }

  habilito(){
    this.habilitarEdicion = true;
  }

  desabilito(){
    this.habilitarEdicion = false;
  }

  editarAdmin(fActualizar : NgForm){
    this.adminActualizado = true;
    this._adminService.editarAdmin(this.admin).subscribe(
      response => {
        this.status = 'Ok';
        if(response.admin){
          console.log('Admin editado')
          this.adminActualizado = false;
          this._adminService.guardarAdmin(response.admin);
          this._adminService.guardarToken(response.token);
          this.admin = response.admin;
        }
      },
      error => {
        if(error){
          console.log(<any>error);
          this.status = 'error';
        }
      }
    )
  }
  
  public filesToUpload : Array<File>
  fileChangeEvent(fileInput : any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  //opciones de imagen
  async opcionesDeImagen() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [{
        text: 'Ver',
        icon: 'contact',
        handler: async () => {
          console.log('Ver foto');
          const modal = await this.modalCtrl.create({
            component : ModalAdminPage,
            componentProps : {
              nombre : this.admin.nickName,
              image : this.admin.image,
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
  async editarFoto() {
    const modal = await this.modalCtrl.create({
      component: ModalAdminPage,
      componentProps: {
        nombre: this.admin.nickName,
        image: this.admin.image,
        editar: true
      },
      animated: true
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    console.log(data)
    if (data.actualizar) {
      this.listo = false;
      this._adminService.getAdmin(this.admin._id).subscribe(
        response => {
          if (response.admin) {
            this.status = 'Ok';
            console.log('Listo')
            this.listo = true;
            this.admin.image = response.admin.image;
          }
        },
        error => {
          if (error) {
            console.log(<any>error);
            this.status = 'error';
          }   
        }
      )
    }
  }

}
