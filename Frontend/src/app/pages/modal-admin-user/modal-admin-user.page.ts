import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GLOBAL } from '../../services/global.service';

@Component({
  selector: 'app-modal-admin-user',
  templateUrl: './modal-admin-user.page.html',
  styleUrls: ['./modal-admin-user.page.scss'],
})
export class ModalAdminUserPage implements OnInit {

  @Input() nombre;
  @Input() email;
  @Input() telefono;
  @Input() departamento;
  @Input() institucion;
  @Input() fechaNacimiento;
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
