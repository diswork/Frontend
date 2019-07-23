import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NgForm } from '@angular/forms';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { MenuController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { GLOBAL } from 'src/app/services/global.service';
import { UploadService } from 'src/app/services/upload.service';


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
  
  constructor(
    private _usuarioService : UsuarioService,
    private uiService: UiServiceService,
    private menuCtrl : MenuController,
    private actionSheetController: ActionSheetController,
    private _uploadService : UploadService, )
  { 
    this.url = GLOBAL.url;
  }

  ngOnInit() {    
    this.menuCtrl.enable(true, "primerMenu");
    this.menuCtrl.enable(false, "segundoMenu");
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
    this.token = this._usuarioService.getToken();
    // this._usuarioService.editarUsuario(this.usuario).subscribe(
    //   response => {
    //     this.status = 'Ok';
    //     if(response.user){
    //       console.log('Usuario editado')
    //       this._usuarioService.guardarUser(response.user);
    //       this._usuarioService.guardarToken(response.token);
    //       this.usuario = response.user;

    //       this._uploadService.makeFileRequest(this.url+'subir-imagen-usuario/'+this.usuario._id,[],this.filesToUpload,this.token,'image')
    //       .then((result : any)=> {
    //         console.log(result);
    //         this.usuario.image = result.usuario.image;
    //         this._usuarioService.guardarUser(result.usuario);
    //         this._usuarioService.guardarToken(result.token);
    //       })
    //     }
    //   },
    //   error => {
    //     if(error){
    //       console.log(<any>error);
    //       this.status = 'error';
    //     }
    //   }
    // )
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

  async opcionesDeImagen() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [{
        text: 'Ver',
        icon: 'contact',
        handler: () => {
          console.log('Ver clicked');
        }
      }, {
        text: 'Actualizar',
        icon: 'create',
        handler: () => {
          console.log('Actualizar clicked');
        }
      }, {
        text: 'Eliminar',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
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
  

}
