import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { Oferta } from '../../models/oferta.model';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-modal-edit-oferta',
  templateUrl: './modal-edit-oferta.page.html',
  styleUrls: ['./modal-edit-oferta.page.scss'],
})
export class ModalEditOfertaPage implements OnInit {

  @Input() titulo;
  @Input() descripcion;
  @Input() fechaPublicacion;
  @Input() categoria;
  @Input() nivelAcademico;
  @Input() imagen;

  oferta: Oferta;
  public imageData: any;
  public tempImages: string[] = [];
  btnCamara: boolean;

  constructor(private modalCtrl: ModalController, private camera: Camera, public navCtrl: NavController) { }

  ngOnInit() {
  }

  editPropuesta(formEditPropuesta: NgForm) {
    this.modalCtrl.dismiss();
  }

  salir() {
    this.modalCtrl.dismiss({
      titulo: this.oferta.titulo,
      descripcion: this.oferta.descripcion,
      fechaPublicacion: this.oferta.fechaPublicacion,
      categoria: this.oferta.categoria,
      nivelAcademico: this.oferta.nivelAcademico,
      imagen: this.oferta.imagen
    });
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


}
