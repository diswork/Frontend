import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { MenuController } from '@ionic/angular';
import { UploadService } from 'src/app/services/upload.service';
import { User } from 'src/app/models/user.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { GLOBAL } from 'src/app/services/global.service';
import { CvRedactado } from 'src/app/models/cvRedactado.model';
import { NgForm } from '@angular/forms';
import { UiServiceService } from 'src/app/services/ui-service.service';

declare var window : any;

@Component({
  selector: 'app-cvs',
  templateUrl: './cvs.page.html',
  styleUrls: ['./cvs.page.scss'],
})
export class CVsPage implements OnInit {

  public cvsRedactado : [];
  public cvsPdf : [];
  public cvsImg : [];
  public tempImages : string[] = [];
  public camara : boolean = false;
  public btnCamara : boolean = false;
  public archivo : boolean = false;
  public redactar : boolean = false;
  public principal : boolean = true;
  public imageData : any;
  public usuario : User;
  public noHayData : boolean = true;
  public siHayData : boolean = false;
  public url;
  public cvRedactado : CvRedactado;

  constructor(
    private camera : Camera, 
    private menuCtrl : MenuController,
    private _uploadService : UploadService,
    private _usuarioService : UsuarioService,
    private _uiService : UiServiceService) { 
      this._usuarioService.validaToken();    
      this.url = GLOBAL.url;
      this.cvRedactado = new CvRedactado("","","","","","","","","")
    }

  ngOnInit() {
    this.menuCtrl.enable(true, "primerMenu");
    this.menuCtrl.enable(false, "segundoMenu");
    this.menuCtrl.enable(false, "tercerMenu");
    this.usuario = this._usuarioService.getUserLog();
    
    if(this.usuario.cvsRedactado.length > 0){
      this.noHayData = false;
      this.siHayData = true;
      this.cvsRedactado = this.usuario.cvsRedactado;
    }
    if(this.usuario.cvsImg.length > 0){
      this.noHayData = false;
      this.siHayData = true;
      this.cvsImg = this.usuario.cvsImg;
    }
    if(this.usuario.cvsPdf.length > 0){
      this.noHayData = false;
      this.siHayData = true;
      this.cvsPdf = this.usuario.cvsPdf;
    }
  }

  doRefresh(event){
    setTimeout(() => {
      this._usuarioService.getUser(this.usuario._id).subscribe(
        response => {
          this.usuario = response.user;
          this.cvsRedactado = this.usuario.cvsRedactado;
          this.cvsImg = this.usuario.cvsImg;
          this.cvsPdf = this.usuario.cvsPdf;
          event.target.complete();
          if(this.usuario.cvsImg.length > 0 || this.usuario.cvsPdf.length > 0 || this.usuario.cvsRedactado.length > 0){
            this.siHayData = true;
            this.noHayData = false;
          }else{
            this.noHayData = true;
          }
        },
        error => {
          if(error){
            console.log(<any>error)
          }
        }
      )   
    }, 2500);
  }

  crear(){
    this.redactar = true;
    this.noHayData = false;
    this.principal = false;
    this.siHayData = false;
    console.log("crear()")
  }

  cancelarCrear(){
    this.redactar = false;
    this.principal = true;
    console.log("cancelarCrear()")
    if(this.usuario.cvsImg.length > 0 || this.usuario.cvsPdf.length > 0 || this.usuario.cvsRedactado.length > 0){
      this.siHayData = true;
    }else{
      this.noHayData = true;
    }
  }

  guardarRedactado(fCvRedactado : NgForm){
    this.cvRedactado.titulo = 'redactado';
    if(fCvRedactado.invalid){
      this._uiService.alertarInformativa('Ingrese todo los campos');
    }else{
      this._usuarioService.redactarCv(this.cvRedactado).subscribe(
        response => {
            if(response.token){
              this._usuarioService.guardarToken(response.token);
              fCvRedactado.reset();
            }
            this.redactar = false;
            this.principal = true;
            this.noHayData = false;
            this.siHayData = true;
        },
        error => {
          if(error){
            console.log(<any>error)
          }
        }
      )
    } 
  }

  subirFoto(){
    this.camara = true;
    this.noHayData = false;
    this.principal = false;
    this.btnCamara = false;
    this.siHayData = false;
    console.log("subirFoto()")   
  }

  cancelarFoto(){
    this.camara = false;
    this.principal = true;
    this.btnCamara = false;
    this.tempImages = [];
    console.log("cancelarFoto()") 
    if(this.usuario.cvsImg.length > 0 || this.usuario.cvsPdf.length > 0 || this.usuario.cvsRedactado.length > 0){
      this.siHayData = true;
    }else{
      this.noHayData = true;
    }
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
      this.tempImages.push( img );
      this.btnCamara = true;

     }, (err) => {
      // Handle error
     });
  }
  
  async guardarFoto(){
    await this._uploadService.subirImagen( this.imageData );
    this.camara = false;
    this.principal = true;
    this.btnCamara = false;
    this.tempImages = [];  
    this.noHayData = false;
    this.siHayData = true;
    this.cvsImg = this.usuario.cvsImg;
    console.log("guardarFoto()") 
  }

  subirArchivo(){
    this.archivo = true;
    this.noHayData = false;
    this.principal = false;
    this.siHayData = false;
    console.log("subirArchivo()")
  }

  cancelarArchivo(){
    this.archivo = false;
    this.principal = true;
    console.log("cancelarArchivo()")
    if(this.usuario.cvsImg.length > 0 || this.usuario.cvsPdf.length > 0 || this.usuario.cvsRedactado.length > 0){
      this.siHayData = true;
    }else{
      this.noHayData = true;
    }
  }

  guardarArchivo(){
    this._uploadService.makeFileRequest(this.url + "subir-cv",['Titulo'],this.fileToUpload,'cv',this._usuarioService.getToken())
      .then((result: any)=>{
        this._usuarioService.guardarToken(result.token);
      }  
    )
    this.archivo = false;
    this.principal = true;
    if(this.usuario.cvsImg.length > 0 || this.usuario.cvsPdf.length > 0 || this.usuario.cvsRedactado.length > 0){
      this.siHayData = true;
    }else{
      this.noHayData = true;
    }
  }

  public fileToUpload: Array<File>
  fileChangeEvent(fileInput: any){
  this.fileToUpload = <Array<File>>fileInput.target.files;
  }


}
