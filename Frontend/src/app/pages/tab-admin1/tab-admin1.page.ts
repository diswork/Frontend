import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { User } from 'src/app/models/user.model';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-tab-admin1',
  templateUrl: './tab-admin1.page.html',
  styleUrls: ['./tab-admin1.page.scss'],
})
export class TabAdmin1Page implements OnInit {

  public usuarios: User;
  public status;
  public dataUser;
  public textoBuscar = '';

  constructor(private menuCtrl : MenuController, private _usuarioService: UsuarioService) { }

  ngOnInit() {
    this.menuCtrl.enable(false, "primerMenu");
    this.menuCtrl.enable(false, "segundoMenu");
    this.menuCtrl.enable(true, "tercerMenu");
    this.getUsuarios();
    // this.dataUser = this._usuarioService.getUserLog();
  }

  getUsuarios() {
    this._usuarioService.getUsers().subscribe(
      response => {
        console.log(response.usuarios);
        this.usuarios = response.usuarios;
        // this.usuarios.push( ...response.usuarios );
      },
      error => {
        if (error) {
          console.log(<any>error);
          this.status = 'error';
        }
      }
    );
  }

  deleteUser(id){
    this._usuarioService.deleteUser(id).subscribe(
      response => {
        console.log(response.usuario);
        this.getUsuarios();
      },
      error=>{
        if(error){
          console.log(<any>error);
          this.status = 'error';
        }
      }
    )
  }
  buscar(event){
    this.textoBuscar = event.detail.value;
  }

}
