import { Component, OnInit, Input } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';
import { User } from 'src/app/models/user.model';
import { Empresa } from 'src/app/models/empresa.model';
import { Oferta } from 'src/app/models/oferta.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { GLOBAL } from 'src/app/services/global.service';
import { NgForm } from '@angular/forms';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { CvRedactado } from 'src/app/models/cvRedactado.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cvs-empresa',
  templateUrl: './cvs-empresa.page.html',
  styleUrls: ['./cvs-empresa.page.scss'],
})
export class CvsEmpresaPage implements OnInit {

  @Input() oferta;
  @Input() noHayData;
  @Input() siHayData;

  public url;
  public empresa: Empresa;

  constructor(
    private modalCtrl : ModalController,
  ) {
      this.url = GLOBAL.url;
   }

  ngOnInit() {
  }

  salir(){
    this.modalCtrl.dismiss({
      actualizar : false
    });
  }

  
  doRefresh(event){
    setTimeout(() =>{
      //this._usuarioService.getCVOferta(this.)
    })
  }

}
