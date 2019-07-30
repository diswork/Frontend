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
      for (let i = 0; i < this.dataUser.empresas.length; i++) {
        this._usuarioService.getOfertasPorEmpresa(this.dataUser.empresas[i]).subscribe(
          response => {
            if (response.ofertas) {

              this.publicaciones.push(response.ofertas);
              console.log(this.publicaciones)

            } else {
              console.log(response.ofertas)
            }
          },
          error => {
            if (error) {
              console.log(<any>error);
              this.status = "no"
            }
          }
        )
      }
    }, 1000)
  
  }

  async opcionesCv(){
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
        }
      }, {
        text: 'Enviar Archivo',
        icon: 'copy',
        handler: () => {
          this.modalCvArchivo();
        }
      }, {
        text: 'Enviar Redactado',
        role: 'destructive',
        icon: 'create',
        handler: () => {
          this.modalCvRedactado();
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

  async modalCvArchivo(){
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

  }

  async modalCvRedactado(){
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

  }

}
