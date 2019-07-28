import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NgForm } from '@angular/forms';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { MenuController, ModalController, LoadingController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { GLOBAL } from 'src/app/services/global.service';
import { UploadService } from 'src/app/services/upload.service';
import { ModalUserPage } from '../modal-user/modal-user.page';


@Component({
  selector: 'app-tab-user3',
  templateUrl: './tab-user3.page.html',
  styleUrls: ['./tab-user3.page.scss'],
})
export class TabUser3Page implements OnInit {

  usuario : User;
  public habilitarEdicion : boolean;
  public status;
  public categorias : [];
  public nivelesAcademicos : [];
  public url;
  public token;
  public usuarioActualizado = false;
  public listo = true;
  
  constructor(
    private _usuarioService : UsuarioService,
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
    this.menuCtrl.enable(true, "primerMenu");
    this.menuCtrl.enable(false, "segundoMenu");
    this.menuCtrl.enable(false, "tercerMenu");
    this.usuario = this._usuarioService.getUserLog();
    this.getCategorias();
    this.getNivelesAcademicos();
  }
  

  habilito(){
    this.habilitarEdicion = true;
  }

  desabilito(){
    this.habilitarEdicion = false;
  }

  editarUser(fActualizar : NgForm){
    this.usuarioActualizado = true;
    this._usuarioService.editarUsuario(this.usuario).subscribe(
      response => {
        this.status = 'Ok';
        if(response.user){
          console.log('Usuario editado')
          this.usuarioActualizado = false;
          this._usuarioService.guardarUser(response.user);
          this._usuarioService.guardarToken(response.token);
          this.usuario = response.user;
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

  getCategorias(){
    this._usuarioService.getCategorias().subscribe(
      response => {
        this.categorias = response.categorias;
      },
      error => {
        if(error){
          console.log(<any>error);
          this.status = 'error';
        }
      }
    )
  }

  getNivelesAcademicos(){
    this._usuarioService.getNiveles().subscribe(
      response => {
        this.nivelesAcademicos = response.nivelAcademico;
      },
      error => {
        if(error){
          console.log(<any>error);
          this.status = 'error';
        }
      }
    )
  }

  // { path: 'modal-user', loadChildren: './pages/modal-user/modal-user.module#ModalUserPageModule' },


  async opcionesDeImagen() {
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
  async editarFoto() {
    const modal = await this.modalCtrl.create({
      component: ModalUserPage,
      componentProps: {
        nombre: this.usuario.nickName,
        image: this.usuario.image,
        editar: true
      },
      animated: true
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    console.log(data)
    if (data.actualizar) {
      this.listo = false;
      this._usuarioService.getUser(this.usuario._id).subscribe(
        response => {
          if (response.user) {
            this.status = 'Ok';
            console.log('Listo')
            this.listo = true;
            this.usuario.image = response.user.image;
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
