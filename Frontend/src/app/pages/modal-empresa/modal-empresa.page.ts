import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GLOBAL } from '../../services/global.service';
import { CameraOptions, Camera } from '@ionic-native/camera/ngx';
import { UploadService } from '../../services/upload.service';
import { UsuarioService } from '../../services/usuario.service';

declare var window: any;

@Component({
  selector: 'app-modal-empresa',
  templateUrl: './modal-empresa.page.html',
  styleUrls: ['./modal-empresa.page.scss'],
})
export class ModalEmpresaPage implements OnInit {

  @Input() nombre;
  @Input() image;
  @Input() editar;

  public url;
  public imageData;

  constructor(private modalCtrl: ModalController, private camera: Camera,
              private _uploadService: UploadService, private _usuarioService: UsuarioService) {
    this.url = GLOBAL.url;
  }

  ngOnInit() {
  }

  salir() {
    this.modalCtrl.dismiss({
      actualizar: false
    });
  }

  tomarFoto() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };

    this.procesarImagen(options);
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
      this.image = img;
    }, (err) => {
      console.log('Error en el modelo de modal empresa');
    });
  }

  async guardarCambios() {
    await this._uploadService.subirImagenEmpresa(this.imageData, this._usuarioService.getEmpresaLog()._id)

    this.modalCtrl.dismiss({
      actualizar: true
    });
  }

}
