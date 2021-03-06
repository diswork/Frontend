import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../models/empresa.model';
import { Oferta } from '../../models/oferta.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MenuController, ModalController } from '@ionic/angular';
import { CVsPage } from '../cvs/cvs.page';
import { CvsEmpresaPage } from '../cvs-empresa/cvs-empresa.page';
import { GLOBAL } from 'src/app/services/global.service';
import { ModalEditarOfertaPage } from '../modal-editar-oferta/modal-editar-oferta.page';

@Component({
  selector: 'app-tab-empresa1',
  templateUrl: './tab-empresa1.page.html',
  styleUrls: ['./tab-empresa1.page.scss'],
})
export class TabEmpresa1Page implements OnInit {

  ofer: Oferta;
  public url: string;
  public status: string;
  public idOferta: string;

  public empresa: Empresa;
  public oferta: Oferta;
  public idEmpresa;

  public ofertas: [];
  public publicaciones;
  public mensaje = false;
  public datosObtenidos;

  constructor(private modalCtrl: ModalController, 
      private _usuarioService: UsuarioService, 
      private menuCtrl: MenuController,) {
    this.empresa = new Empresa('', '', '', '', 'empresa', '', '', '');
    this.oferta = new Oferta('', '', '', new Date(), '', '', '', '', [], '', true);
    this.readOfertasEmpresa(this._usuarioService.getEmpresaLog()._id);
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.empresa = this._usuarioService.getEmpresaLog();
    this.menuCtrl.enable(false, "primerMenu");
    this.menuCtrl.enable(true, "segundoMenu");
    this.menuCtrl.enable(false, "tercerMenu");
    this.readOfertasEmpresa(this._usuarioService.getEmpresaLog()._id);
    this.datosObtenidos = [];

  }

  readOfertasEmpresa(id) {
    this._usuarioService.readOfertaEmpresa(id).subscribe(
      response => {
        if(response.message == 'No exisen ofertas de esta empresa'){
          this.ofertas = [];
          this.mensaje = true;
        }else if(response.ofertas){
          this.status = 'ok';
          this.ofertas = response.ofertas;
          this.datosObtenidos = response.ofertas;
        }
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'Error';
        }
      }
    )
  }



  eliminarOferta(id) {
    this._usuarioService.eliminarOferta(id).subscribe(
      response => {
        if (!response.oferta) {
          this.status = 'ERROR';

        } else {
          this.status = 'SUCCESS';

          this.readOfertasEmpresa(this._usuarioService.getEmpresaLog()._id);

        }
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'ERROR';
        }
      }
    )
  }



  async verCvs(id) {

    this._usuarioService.getOfertaById(id).subscribe(
      async response => {
        if(response.img.length == 0 && response.pdf.length == 0 && response.redactado.length == 0){
          const modal = await this.modalCtrl.create({
            component: CvsEmpresaPage,
            componentProps: {
              noHayData : true,
              siHayData : false
            },
            animated: true
          });
          await modal.present();
        }else if(response.oferta){
          const modal = await this.modalCtrl.create({
            component: CvsEmpresaPage,
            componentProps: {
              oferta: response.oferta,
              noHayData : false,
              siHayData : true
            },
            animated: true
          });
          await modal.present();
        }
      },
      error => {
        if(error){
          console.log(<any>error);
        }
      }
    )
   
  }

  doRefresh(event){
    this.ofertas = [];
    this.mensaje = false;
    setTimeout(() => {
      this._usuarioService.readOfertaEmpresa(this._usuarioService.getEmpresaLog()._id).subscribe(
        response => {
          if(response.message == 'No exisen ofertas de esta empresa'){
            this.mensaje = true;
            this.ofertas = []
            event.target.complete();
          }else if(response.ofertas){
            this.status = 'ok';
            this.ofertas = response.ofertas;
            event.target.complete();
          }
        },
        error => {
          var errorMessage = <any>error;
          console.log(errorMessage);
          if (errorMessage != null) {
            this.status = 'Error';
          }
        }
      )   
    }, 2500);
  }

  async editarOferta(datas){
    console.log(datas)
    const modal = await this.modalCtrl.create({
      component: ModalEditarOfertaPage,
      componentProps: {
        data : datas,
        nombre : this.empresa.nombre
      },
      animated: true
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();

    if(data.editar){
      this._usuarioService.editPropuesta(data.datos).subscribe(
        response => {
          if(response.oferta){
            this.readOfertasEmpresa(this.empresa._id);
          }

        },
        error => {
          if(error){
            console.log(<any>error)
          }
        }
      )
    }
  }

}
