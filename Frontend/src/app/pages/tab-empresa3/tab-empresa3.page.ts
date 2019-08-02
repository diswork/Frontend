import { Component, OnInit, ViewChild } from '@angular/core';
import { Empresa } from 'src/app/models/empresa.model';
import { UsuarioService } from '../../services/usuario.service';
import { NgForm } from '@angular/forms';
import { UiServiceService } from '../../services/ui-service.service';
import { MenuController, ActionSheetController, ModalController, LoadingController } from '@ionic/angular';
import { UploadService } from 'src/app/services/upload.service';
import { GLOBAL } from '../../services/global.service';
import { ModalEmpresaPage } from '../modal-empresa/modal-empresa.page';

@Component({
  selector: "app-tab-empresa3",
  templateUrl: "./tab-empresa3.page.html",
  styleUrls: ["./tab-empresa3.page.scss"]
})
export class TabEmpresa3Page implements OnInit {

  constructor(
    private _usuarioService: UsuarioService,
    private uiService: UiServiceService,
    private menuCtrl: MenuController,
    private actionSheetCtrl: ActionSheetController,
    private _uploadService: UploadService,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController
  ) {
    this.url = GLOBAL.url;
  }

  empresa: Empresa;
  public habilitarEdicion: boolean;
  public status;
  public url;
  public token;
  public empresaActualizado = false;
  public listo = true;

  public filesToUpload: Array<File>;

  loading: any;

  ngOnInit() {
    this.menuCtrl.enable(false, "primerMenu");
    this.menuCtrl.enable(true, "segundoMenu");
    this.menuCtrl.enable(false, "tercerMenu");
    this.empresa = this._usuarioService.getEmpresaLog();
  }

  habilito() {
    this.habilitarEdicion = true;
  }

  desabilito() {
    this.habilitarEdicion = false;
  }

  editarEmpresa(fEditarEmpresa: NgForm) {
    this.empresaActualizado = true;
    this._usuarioService.editarEmpresa(this.empresa).subscribe(
      response => {
        this.status = "Ok";
        if (response.empresa) {
          console.log("Empresa Editada");
          this.empresaActualizado = false;
          this._usuarioService.guardarEmpresa(response.empresa);
          this._usuarioService.guardarToken(response.token);
          this.empresa = response.empresa;
        }
      },
      error => {
        if (error) {
          console.log(<any>error);
          this.status = "Error";
        }
      }
    );
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  async opcionesMenuImagen() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      buttons: [{
        text: 'Ver',
        icon: 'contact',
        handler: async () => {
          console.log('Ver foto');
          const modal = await this.modalCtrl.create({
            component: ModalEmpresaPage,
            componentProps: {
              nombre: this.empresa.nombre,
              image: this.empresa.image,
              editar: false
            },
            animated: true
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
          console.log('Cancelar');
        }
      }]
    });
    await actionSheet.present();
  }


  async editarFoto() {
    const modal = await this.modalCtrl.create({
      component: ModalEmpresaPage,
      componentProps: {
        nombre: this.empresa.nombre,
        image: this.empresa.image,
        editar: true
      },
      animated: true
    });
    await modal.present();

    const {data} = await modal.onDidDismiss();
    console.log(data);
    if (data.actualizar) {
      this.listo = false;
      this._usuarioService.getEmpresa(this.empresa._id).subscribe(
        response => {
          if (response.empresa) {
            this.status = 'Ok';
            console.log('Listo');
            this.empresa.image = response.empresa.image;
            this.listo = true;
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
  }
}