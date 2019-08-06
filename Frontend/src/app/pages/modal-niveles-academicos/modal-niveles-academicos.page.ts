import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, AlertController, IonList } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NivelAcademico } from 'src/app/models/nivelAcademico.model';

@Component({
  selector: 'app-modal-niveles-academicos',
  templateUrl: './modal-niveles-academicos.page.html',
  styleUrls: ['./modal-niveles-academicos.page.scss'],
})
export class ModalNivelesAcademicosPage implements OnInit {

  @ViewChild('cerrarLista') lista: IonList;


  public editando = false
  public nivelesAcademicos: NivelAcademico
  public newNivelAcademico: NivelAcademico
  public textoBuscar = ''
  public status;
  public actualizando = false
  public identificador;
  public descripcion;
  public mensaje = false;

  constructor(private alertCtrl: AlertController, private modalCtrl: ModalController, private _nivelAcademicoService: UsuarioService) {
    this.newNivelAcademico = new NivelAcademico('');
  }

  ngOnInit() {
    this.getNivelesAcademicos();
  }

  buscar(event) {
    this.textoBuscar = event.detail.value;
  }

  salir() {
    this.modalCtrl.dismiss();
  }

  activarActualizando(id, getdescripcion) {
    this.actualizando = true;
    this.identificador = id;
    this.descripcion = getdescripcion;
    this.newNivelAcademico.descripcion = ''
  }

  desactivarActualizando() {
    this.actualizando = false;
  }

  activarEdicion() {
    this.editando = true
    this.newNivelAcademico.descripcion = ''

  }

  desactivarEdicion() {
    this.editando = false
    this.newNivelAcademico.descripcion = ''
  }

  async openDeleteAlert(id) {
    var identificador = id
    const alert = await this.alertCtrl.create({
      header: 'Eliminar Categoria',
      buttons: [{
        text: 'Si',
        role: 'Si',
        cssClass: 'secondary',
        handler: () => {
          this.deleteNivelAcademico(identificador)
          this.lista.closeSlidingItems()

        }
      },
      {
        text: 'No',
        handler: () => {
          this.lista.closeSlidingItems()
        }
      }
      ]
    });
    alert.onDidDismiss().then(() => {
      this.getNivelesAcademicos();
    })
    alert.present();
  }

  addNivelAcademico() {
    this._nivelAcademicoService.addNivelAcademico(this.newNivelAcademico).subscribe(
      response => {
        if (response.nivelAcademico) {
          this.editando = false
          this.getNivelesAcademicos();
        }
      },
      error => {
        if (error) {
          console.log(<any>error);
        }
      }
    )
  }

  deleteNivelAcademico(id) {
    this._nivelAcademicoService.deleteNivelAcademico(id).subscribe(
      response => {
        if (response.equipo) {
          this.status = 'Ok'
        }
      },
      error => {
        if (error) {
          console.log(<any>error);
        }
      }
    )
  }

  getNivelesAcademicos() {
    this._nivelAcademicoService.getNivelesAcademicos().subscribe(
      response => {
        if (response.nivelAcademico) {
          this.nivelesAcademicos = response.nivelAcademico
          if (response.nivelAcademico == 0) {
            this.mensaje = true
          } else {
            this.mensaje = false
          }
        }
      },
      error => {
        if (error) {
          console.log(<any>error);
        }
      }
    )
  }

  updateNivelAcademico() {
    this._nivelAcademicoService.updateNivelAcademico(this.identificador, this.newNivelAcademico).subscribe(
      response => {
        if (response.nivelAcademico) {
          this.status = 'ok'
          this.actualizando = false;
          this.getNivelesAcademicos()
        }
      },
      error => {
        if (error) {
          console.log(<any>error);

        }
      }
    )
  }

}
