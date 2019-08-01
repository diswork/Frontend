import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent{

  @Input() nameUser;

  constructor(private usuarioService : UsuarioService,
              private menuCtrl : MenuController) { 
                // this.nameUser = this.usuarioService.getUserLog().nickName;             
              }

  traerData(){
    this.nameUser = this.usuarioService.getUserLog().nickName;
    console.log(this.nameUser)
  }

  cerrarCesion(){
    this.usuarioService.limpiarStorage();
  }

  cerrarMenu(){
    this.menuCtrl.toggle();
  }



}
