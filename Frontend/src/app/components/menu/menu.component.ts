import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(private usuarioService : UsuarioService,
              private menuCtrl : MenuController) { }

  ngOnInit() {}

  cerrarCesion(){
    this.usuarioService.limpiarStorage();
  }

  cerrarMenu(){
    this.menuCtrl.toggle();
  }

}
