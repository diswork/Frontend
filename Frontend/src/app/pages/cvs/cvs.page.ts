import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { MenuController } from '@ionic/angular';

declare var window : any;

@Component({
  selector: 'app-cvs',
  templateUrl: './cvs.page.html',
  styleUrls: ['./cvs.page.scss'],
})
export class CVsPage implements OnInit {

  public cvs : [];
  public tempImages : string[] = [];
  public camara : boolean = false;
  public archivo : boolean = false;
  public redactar : boolean = false;
  public noHayData : boolean = true;
  public principal : boolean = true;

  constructor(private camera : Camera, private menuCtrl : MenuController) { }

  ngOnInit() {
    this.menuCtrl.enable(true, "primerMenu");
    this.menuCtrl.enable(false, "segundoMenu");
  }

  crear(){
    this.redactar = true;
    this.noHayData = false;
    this.principal = false;
    console.log("crear()")
  }

  cancelarCrear(){
    this.redactar = false;
    this.noHayData = true;
    this.principal = true;
    console.log("cancelarCrear()")
  }

  subirFoto(){
    this.camara = true;
    this.noHayData = false;
    this.principal = false;
    console.log("subirFoto()")   
  }

  cancelarFoto(){
    this.camara = false;
    this.noHayData = true;
    this.principal = true;
    console.log("cancelarFoto()") 
  }

  tomarFoto(){
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation : true,
      sourceType : this.camera.PictureSourceType.CAMERA
    };
    this.procesarImagen(options);
  }

  escogerFoto(){
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation : true,
      sourceType : this.camera.PictureSourceType.PHOTOLIBRARY
    };
    this.procesarImagen(options);
  }

  procesarImagen(options : CameraOptions){
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
       const img = window.Ionic.WebView.convertFileSrc(imageData);
       console.log(img);
       this.tempImages.push(img);
     }, (err) => {
      // Handle error
     });
  }

  subirArchivo(){
    this.archivo = true;
    this.noHayData = false;
    this.principal = false;
    console.log("subirArchivo()")
  }

  cancelarArchivo(){
    this.archivo = false;
    this.noHayData = true;
    this.principal = true;
    console.log("cancelarArchivo()")

  }

}
