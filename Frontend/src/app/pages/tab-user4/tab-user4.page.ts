import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList, MenuController, ModalController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { GLOBAL } from 'src/app/services/global.service';
import { ModalOfertPage } from '../modal-ofert/modal-ofert.page';

@Component({
  selector: 'app-tab-user4',
  templateUrl: './tab-user4.page.html',
  styleUrls: ['./tab-user4.page.scss'],
})
export class TabUser4Page implements OnInit {

  @ViewChild('lista') lista: IonList;

  public notificaciones;
  public url;
  public dataUser;
  public mensaje = false;

  constructor(
    private menuCtrl : MenuController,
    private _usuarioService : UsuarioService,
    private modalCtrl : ModalController)
  { 
    this.url = GLOBAL.url;
  }

  ngOnInit() {    
    this.menuCtrl.enable(true, "primerMenu");
    this.menuCtrl.enable(false, "segundoMenu");
    this.menuCtrl.enable(false, "tercerMenu");
    this.dataUser = this._usuarioService.getUserLog();
    this._usuarioService.getOfertas().subscribe(
      response => {
        if(response.ofertas){
          this.notificaciones = response.ofertas;
          console.log(this.notificaciones)
        }else if(response.message === 'no') {
          this.mensaje = true;     
        }
      },
      error => {
        if(error){
          console.log(<any>error)
        }
      }
    )
  }
  
  cerrar(){
    this.lista.closeSlidingItems();
  }

  doRefresh(event){
    setTimeout(() => {
      this._usuarioService.getOfertas().subscribe(
        response => {
          if(response.ofertas){
            this.notificaciones = response.ofertas;
            event.target.complete();
          }
        },
        error => {
          if(error){
            console.log(<any>error)
          }
        }
      )
    }, 2500);
  }

  async verOferta(dt){
    this.dataUser = this._usuarioService.getUserLog();
    const modal = await this.modalCtrl.create({
      component : ModalOfertPage,
      componentProps : {
        nombre : this.dataUser.nickName,
        datos : dt,
        cvsImg : this.dataUser.cvsImg,
        cvsRedactado : this.dataUser.cvsRedactado,
        cvsPdf : this.dataUser.cvsPdf
      },
      animated : true
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
  }

}
