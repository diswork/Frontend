import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GLOBAL } from 'src/app/services/global.service';

@Component({
  selector: 'app-modal-admin-empresa',
  templateUrl: './modal-admin-empresa.page.html',
  styleUrls: ['./modal-admin-empresa.page.scss'],
})
export class ModalAdminEmpresaPage implements OnInit {

  @Input() nombre;
  @Input() email;
  @Input() direccion;
  @Input() telefono;
  @Input() image;

  public url;

  constructor(private modalCtrl: ModalController) { 
    this.url = GLOBAL.url;
  }

  ngOnInit() {
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

}
