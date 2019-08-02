import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GLOBAL } from 'src/app/services/global.service';

@Component({
  selector: 'app-modal-empresa-user',
  templateUrl: './modal-empresa-user.page.html',
  styleUrls: ['./modal-empresa-user.page.scss'],
})
export class ModalEmpresaUserPage implements OnInit {

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
