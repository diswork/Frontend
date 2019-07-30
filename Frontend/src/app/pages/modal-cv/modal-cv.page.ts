import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UploadService } from 'src/app/services/upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { GLOBAL } from 'src/app/services/global.service';

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

  constructor(private modalCtrl : ModalController,
      private _uploadService : UploadService, 
      private _usuarioService : UsuarioService) 
  { 
    this.url = GLOBAL.url;
  }

  
  salir(){
    this.modalCtrl.dismiss({
      actualizar : false
    });
  }

  enviar(dt){
    console.log(dt)
    setTimeout(() => {
      this.modalCtrl.dismiss();
    })    
  }


}
