import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { ModalCvPage } from '../modal-cv/modal-cv.page';
import { UsuarioService } from 'src/app/services/usuario.service';
import { GLOBAL } from 'src/app/services/global.service';

@Component({
  selector: 'app-modal-ofert',
  templateUrl: './modal-ofert.page.html',
  styleUrls: ['./modal-ofert.page.scss'],
})
export class ModalOfertPage implements OnInit {

  @Input() datos;
  @Input() nombre;
  @Input() cvsImg;
  @Input() cvsRedactado;
  @Input() cvsPdf;

  public url;

  constructor(
    private modalCtrl : ModalController,
    private actionSheetController: ActionSheetController,
    private _usuarioService : UsuarioService) { 
      this.url = GLOBAL.url;
    }

  ngOnInit() {
  }

  
  
  salir(){
    this.modalCtrl.dismiss();
  }

  async opcionesCv(id){
    console.log(id)
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [{
        text: 'Enviar Imagen',
        icon: 'image',
        handler: async () => {
          const modal = await this.modalCtrl.create({
            component : ModalCvPage,
            componentProps : {
              nombre : this.nombre,
              images : this.cvsImg
            },
            animated : true
          });
          await modal.present();

          const { data } = await modal.onDidDismiss();

          if(data){
            console.log(data)
            this._usuarioService.enviarCv(id, data.archivo).subscribe(
              response => {
                if(response){
                  console.log(response)
                  if (response) {
                    console.log(response)
                  }
                }
              },
              error => {
                if(error){
                  console.log(<any>error)
                }
              }
            )
            console.log('listo')
          }
        }
      }, {
        text: 'Enviar Archivo',
        icon: 'copy',
        handler: () => {
         this.modalCvArchivo(id);
        }
      }, {
        text: 'Enviar Redactado',
        icon: 'create',
        handler: () => {
         this.modalCvRedactado(id);
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async modalCvArchivo(id){
    const modal = await this.modalCtrl.create({
      component : ModalCvPage,
      componentProps : {
        nombre : this.nombre,
        archivos : this.cvsPdf
      },
      animated : true
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    if(data){
      console.log(data)
      this._usuarioService.enviarCv(id, data.archivo).subscribe(
        response => {
          if(response){
            console.log(response)
            if (response) {
              console.log(response)
            }
          }
        },
        error => {
          if(error){
            console.log(<any>error)
          }
        }
      )
      console.log('listo')
    }
  }

  async modalCvRedactado(id){
    const modal = await this.modalCtrl.create({
      component : ModalCvPage,
      componentProps : {
        nombre : this.nombre,
        redactados : this.cvsRedactado
      },
      animated : true
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    if(data){
      console.log(data)
      this._usuarioService.enviarCv(id, data.archivo).subscribe(
        response => {
          if (response) {
            console.log(response)
          }
          
        },
        error => {
          if(error){
            console.log(<any>error)
          }
        }
      )
      console.log('listo')
    }
  }


}
