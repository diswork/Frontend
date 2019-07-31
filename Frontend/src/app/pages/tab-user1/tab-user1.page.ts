import { Component, OnInit } from '@angular/core';
import { MenuController, ActionSheetController, ModalController } from '@ionic/angular';
import { User } from 'src/app/models/user.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Oferta } from 'src/app/models/oferta.model';
import { GLOBAL } from 'src/app/services/global.service';
import { ModalCvPage } from '../modal-cv/modal-cv.page';

@Component({
  selector: 'app-tab-user1',
  templateUrl: './tab-user1.page.html',
  styleUrls: ['./tab-user1.page.scss'],
})
export class TabUser1Page implements OnInit {

public publicaciones;
public dataUser : User;
public status;
public url;
public mensaje = false;

  constructor(
    private menuCtrl : MenuController,
    private _usuarioService : UsuarioService,
    private actionSheetController: ActionSheetController,
    private modalCtrl : ModalController,
  ) { 
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.publicaciones = [];
    this.dataUser = this._usuarioService.getUserLog();
    this.menuCtrl.enable(true, "primerMenu");
    this.menuCtrl.enable(false, "segundoMenu");
    this.menuCtrl.enable(false, "tercerMenu");
    setTimeout(() => {
        this._usuarioService.getOfertasPorEmpresa().subscribe(
          response => {
            
            if (response.ofertas) {
              
              this.publicaciones = response.ofertas;
             console.log(this.publicaciones)
            } else if(response.message === 'no') {
                this.mensaje = true;     
            }
          },
          error => {
            if (error) {
              console.log(<any>error);
              this.status = "no"
            }
          }
        )      
    }, 1000)
  
  }


  doRefresh(event){
    this.publicaciones = [];
    this.mensaje = false;
    setTimeout(() => {
      this._usuarioService.getOfertasPorEmpresa().subscribe(
        response => {
          
          if (response.ofertas) {
            this.publicaciones = response.ofertas;
            console.log(this.publicaciones)

            event.target.complete();

          } else if(response.message === 'no') {
              this.mensaje = true;     
              event.target.complete();

          }
        },
        error => {
          if (error) {
            console.log(<any>error);
            this.status = "no"
          }
        }
      )     
    }, 2500);
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
              nombre : this.dataUser.nickName,
              images : this.dataUser.cvsImg
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
        nombre : this.dataUser.nickName,
        archivos : this.dataUser.cvsPdf
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
        nombre : this.dataUser.nickName,
        redactados : this.dataUser.cvsRedactado
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
