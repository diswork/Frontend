import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GLOBAL } from 'src/app/services/global.service';
import { CameraOptions, Camera } from '@ionic-native/camera/ngx';
import { UploadService } from 'src/app/services/upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';

declare var window : any;

@Component({
  selector: 'app-modal-admin',
  templateUrl: './modal-admin.page.html',
  styleUrls: ['./modal-admin.page.scss'],
})
export class ModalAdminPage implements OnInit {

  @Input() nombre;
  @Input() image;
  @Input() editar;

  public url;
  public imageData;

  constructor(private modalCtrl : ModalController, private camera : Camera,
              private _uploadService : UploadService, private _usuarioService : UsuarioService) 
  { 
    this.url = GLOBAL.url;
  }

  ngOnInit() {
  }

  salir(){
    this.modalCtrl.dismiss({
      actualizar : false
    });
  }

  tomarFoto(){
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };

    this.procesarImagen( options );
  }

  escogerFoto(){
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    this.procesarImagen( options );
  }

  procesarImagen(options : CameraOptions){
    this.camera.getPicture(options).then( ( imageData ) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):

      const img = window.Ionic.WebView.convertFileSrc( imageData );
      
      this.imageData = imageData;
      this.image = img;

     }, (err) => {
      // Handle error
     });
  }

  async guardarCambios(){
    await this._uploadService.subirImagenAdmin(this.imageData, this._usuarioService.getAdminLog()._id)

      this.modalCtrl.dismiss({
        actualizar : true
      });
    
   
  }
  

}
