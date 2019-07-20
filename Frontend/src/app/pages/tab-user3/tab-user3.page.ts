import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NgForm } from '@angular/forms';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tab-user3',
  templateUrl: './tab-user3.page.html',
  styleUrls: ['./tab-user3.page.scss'],
})
export class TabUser3Page implements OnInit {

  usuario : User;
  public habilitarEdicion : boolean;
  public status;  
  public categorias : [];
  public nivelesAcademicos : [];
  
  constructor(private _usuarioService : UsuarioService,
              private uiService: UiServiceService,
              private menuCtrl : MenuController) { }

  ngOnInit() {    
    this.menuCtrl.enable(true, "primerMenu");
    this.menuCtrl.enable(false, "segundoMenu");
    this.usuario = this._usuarioService.getUserLog();
    this.getCategorias();
    this.getNivelesAcademicos();
  }
  

  habilito(){
    this.habilitarEdicion = true;
  }

  desabilito(){
    this.habilitarEdicion = false;
  }

  editarUser(fActualizar : NgForm){
    this._usuarioService.editarUsuario(this.usuario).subscribe(
      response => {
        this.status = 'Ok';
        if(response.user){
          console.log('Usuario editado')
          this._usuarioService.guardarUser(response.user);
          this._usuarioService.guardarToken(response.token);
          this.usuario = response.user;
        }
      },
      error => {
        if(error){
          console.log(<any>error);
          this.status = 'error';
        }
      }
    )
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

  pruebaImg(){
    this.uiService.alertarInformativa('Prueba men');
  }

  

}
