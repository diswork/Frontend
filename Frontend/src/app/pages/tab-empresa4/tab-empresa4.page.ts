import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { Oferta } from '../../models/oferta.model';
import { Empresa } from '../../models/empresa.model';
import { UsuarioService } from '../../services/usuario.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { UploadService } from 'src/app/services/upload.service';
import { UiServiceService } from '../../services/ui-service.service';

declare var window: any;

@Component({
  templateUrl: './tab-empresa4.page.html',
  styleUrls: ['./tab-empresa4.page.scss'],
})
export class TabEmpresa4Page implements OnInit {

  public url: string;
  public status: string;
  public oferta: Oferta;
  public empresa: Empresa;
  public categorias: [];
  public nivelesAcademicos: [];
  public imageData: any;
  public btnCamara: boolean = false;
  public tempImages: string[] = [];
  public ofertas: [];

  constructor(
      public _usuarioService: UsuarioService,
      private menuCtrl : MenuController,  
      private camera : Camera,
      private _uploadService : UploadService) {
    this.oferta = new Oferta('','', '', new Date(), '', '', '', '', [], '', true);
    this.empresa = new Empresa('', '', '', '', 'empresa', '', '', '');
  }

  ngOnInit() {
    this.menuCtrl.enable(false, "primerMenu");
    this.menuCtrl.enable(true, "segundoMenu");
    this.menuCtrl.enable(false, "tercerMenu");
    this.getCategorias();
    this.getNivelesAcademicos();
    this.readOfertasEmpresa(this._usuarioService.getEmpresaLog()._id);
  }

  addOferta(formAddPropuesta: NgForm) {
    console.log(formAddPropuesta.invalid);

    if (formAddPropuesta.invalid) {
      this.uiService.alertarInformativa('Ingrese todos los datos requeridos');
    } else {

      this._usuarioService.addPropuesta(this.oferta).subscribe(
        response => {
          if (response.oferta) {
            console.log(response.oferta._id)
            this._uploadService.subirImagenOferta(this.imageData, response.oferta._id);
            formAddPropuesta.reset();
            this.readOfertasEmpresa(this._usuarioService.getEmpresaLog()._id);
          }
        },
        error => {
          if (error) {
            console.log(<any>error);
            this.status = 'error';
          }
        }
      );
      this.btnCamara = false;
    }
  }

  getCategorias() {
    this._usuarioService.getCategorias().subscribe(
      response => {
        this.categorias = response.categorias;
        console.log(this.categorias)
      },
      error => {
        if (error) {
          console.log(<any>error);
          this.status = 'error';
        }
      }
    )
  }

  getNivelesAcademicos() {
    this._usuarioService.getNiveles().subscribe(
      response => {
        this.nivelesAcademicos = response.nivelAcademico;
      },
      error => {
        if (error) {
          console.log(<any>error);
          this.status = 'error';
        }
      }
    )
  }

  escogerFoto() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    this.procesarImagen(options);
  }

  procesarImagen(options: CameraOptions) {
    this.camera.getPicture(options).then((imageData) => {

      const img = window.Ionic.WebView.convertFileSrc(imageData);

      this.imageData = imageData;
      this.tempImages.push(img);
      console.log(this.tempImages);
      this.btnCamara = true;

    }, (err) => {
      // Handle error
    });
  }

  readOfertasEmpresa(id) {
    this._usuarioService.readOfertaEmpresa(id).subscribe(
      response => {
        this.status = 'ok';
        this.ofertas = response.ofertas;
        console.log(this.ofertas);
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'Error';
        }
      }
    )
  }

  listOferta(id) {

  }

}
