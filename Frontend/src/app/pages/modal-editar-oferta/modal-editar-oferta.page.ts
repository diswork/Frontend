import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ModalController } from '@ionic/angular';
import { UiServiceService } from 'src/app/services/ui-service.service';

@Component({
  selector: 'app-modal-editar-oferta',
  templateUrl: './modal-editar-oferta.page.html',
  styleUrls: ['./modal-editar-oferta.page.scss'],
})
export class ModalEditarOfertaPage implements OnInit {

  @Input() data
  @Input() nombre

  public categorias : [];
  public nivelesAcademicos : [];
  public status;

  constructor(private _usuarioService : UsuarioService, 
              private modalCtrl : ModalController,
              private uiService: UiServiceService,) { }

  ngOnInit() {
    this.getCategorias()
    this.getNivelesAcademicos()
  }

  getCategorias(){
    this._usuarioService.getCategorias().subscribe(
      response => {
        this.categorias = response.categorias;
      },
      error => {
        if(error){
          console.log(<any>error);
          this.status = 'error';
        }
      }
    )
  }

  getNivelesAcademicos(){
    this._usuarioService.getNiveles().subscribe(
      response => {
        this.nivelesAcademicos = response.nivelAcademico;
      },
      error => {
        if(error){
          console.log(<any>error);
          this.status = 'error';
        }
      }
    )
  }

  
  
  salir(){
    this.modalCtrl.dismiss();
  }

  EditarOferta(formEditarPropuesta){
    if(formEditarPropuesta.invalid){
      this.uiService.alertarInformativa('Ingrese todos los cambios')
    }else{
      this.modalCtrl.dismiss({  
          datos : this.data,
          id : this.data._id        
      });
    }
  }

}
