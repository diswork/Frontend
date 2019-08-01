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

  @Input() idOferta;

  public curriculum : [];
  public cvsPdf : [];
  public cvsImg : [];
  public url;
  public empresa: Empresa;
  public oferta: Oferta;
  public noHayData : boolean = true;
  public siHayData : boolean = false;
  status: string;

  constructor(
    private _uploadService : UploadService,
    private _usuarioService : UsuarioService,
    private _uiService : UiServiceService,
    private modalCtrl : ModalController,
  ) {
    this._usuarioService.validaToken();    
      this.url = GLOBAL.url;
   }

  ngOnInit() {
    this.getCV();
    /*
    if(this.oferta.curriculum.length > 0){
      this.noHayData = false;
      this.siHayData = true;
      this.curriculum = this.oferta.curriculum;
    }*/
  }

  salir(){
    this.modalCtrl.dismiss({
      actualizar : false
    });
  }

  

  getCV(){
    this._usuarioService.getCVOferta(this.idOferta).subscribe(
      response=>{
        if(response.cvsEncontrados){
          console.log(response.cvsEncontrados)
          //this.partidos = response.cvsEncontrados;
        }
      },
      error=>{
        var errorMessage = <any>error; 
        console.log(errorMessage); 
        if(errorMessage != null){
          this.status = 'ERROR'
        }
      }
    )
  }

  doRefresh(event){
    setTimeout(() =>{
      //this._usuarioService.getCVOferta(this.)
    })
  }

}
