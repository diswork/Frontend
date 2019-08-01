import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../models/empresa.model';
import { Oferta } from '../../models/oferta.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MenuController, ModalController } from '@ionic/angular';
import { CVsPage } from '../cvs/cvs.page';
import { CvsEmpresaPage } from '../cvs-empresa/cvs-empresa.page';

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

  public ofertas : [];
  public publicaciones;
  

  constructor(private modalCtrl : ModalController, private _usuarioService : UsuarioService,private menuCtrl : MenuController) {
    this.empresa = new Empresa('', '', '', '', 'empresa', '', '', '');
    this.oferta = new Oferta('','', '', new Date(), '', '', '', '', [], '', true);
    this.readOfertasEmpresa(this._usuarioService.getEmpresaLog()._id);   
    
  }

  ngOnInit() {
    
    this.menuCtrl.enable(false, "primerMenu");
    this.menuCtrl.enable(true, "segundoMenu");
    this.menuCtrl.enable(false, "tercerMenu");
    this.readOfertasEmpresa(this._usuarioService.getEmpresaLog()._id);     
    
  }

  readOfertasEmpresa(id) {
    this._usuarioService.readOfertaEmpresa(id).subscribe(
      response => {
        this.status = 'ok';
        this.ofertas = response.ofertas;
        console.log(this.ofertas);
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



  eliminarOferta(id){                     
    this._usuarioService.eliminarOferta(id).subscribe(
      response=>{
        if(!response.oferta){
          this.status = 'ERROR'
        
        }else{
          this.status = 'SUCCESS'
        
        this.readOfertasEmpresa(this._usuarioService.getEmpresaLog()._id); 
    
         
          console.log(response.Promesa)
        }
      },
      error=>{
        var errorMessage = <any>error;
        console.log(errorMessage);
        if(errorMessage != null){
          this.status = 'ERROR'
        }
      }
    )
  }

  idO(id){
    this.idOferta = id;
    console.log(this.idOferta);

  }

async cvs(){
  const modal = await this.modalCtrl.create({
    component: CvsEmpresaPage,
    componentProps:{
      idOferta: this.idOferta,
    },
    animated: true
  });
  await modal.present();
}


}
