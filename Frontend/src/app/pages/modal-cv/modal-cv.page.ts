import { Component, OnInit, Input } from '@angular/core';
import { ModalController, Platform, ToastController } from '@ionic/angular';
import { UploadService } from 'src/app/services/upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { GLOBAL } from 'src/app/services/global.service';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-modal-cv',
  templateUrl: './modal-cv.page.html',
  styleUrls: ['./modal-cv.page.scss'],
})
export class ModalCvPage {

  @Input() nombre;
  @Input() images;
  @Input() archivos;
  @Input() redactados;

  public url;
  public imageData;
  public envio = false;

  constructor(private modalCtrl : ModalController,
      private _uploadService : UploadService, 
      private _usuarioService : UsuarioService,
      private _document : DocumentViewer,
      private fileOpener : FileOpener,
      private ft : FileTransfer,
      private platform : Platform,
      private file : File,
      public toastController: ToastController)
  { 
    this.url = GLOBAL.url;
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Cv enviado.',
      duration: 1000,
      position : "bottom",
      animated : true,
      color : 'primary'
    });
    toast.present();
  }


  
  salir(){
    this.modalCtrl.dismiss();
  }

  enviar(dt){
    this.envio = true;
    setTimeout(() => {
      this.modalCtrl.dismiss({
        archivo : dt
      });
      this.envio = false;
      this.presentToast();
    },1500)    
  }

  verPdf(archivo){

    if(this.platform.is('android')){
      let fakeName = Date.now();
      this.file.copyFile(this.url + `obtener-cv/${archivo}`, archivo, this.file.dataDirectory, `${fakeName}.pdf`).then(result => {
        this.fileOpener.open(result.nativeURL, 'application/pdf')
      })

    }else{
      const options : DocumentViewerOptions = {
        title : 'My PDF'
      }
      this._document.viewDocument(this.url + `obtener-cv/${archivo}`,'application/pdf', options);
    }

  }

}
