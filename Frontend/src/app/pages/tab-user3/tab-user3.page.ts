import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NgForm } from '@angular/forms';
import { UiServiceService } from 'src/app/services/ui-service.service';

@Component({
  selector: 'app-tab-user3',
  templateUrl: './tab-user3.page.html',
  styleUrls: ['./tab-user3.page.scss'],
})
export class TabUser3Page implements OnInit {

  usuario : User;
  public habilitarEdicion : boolean;
  public status;  

  constructor(private usuarioService : UsuarioService,
              private uiService: UiServiceService) { }

  ngOnInit() {
    this.usuario = this.usuarioService.getUserLog();
    console.log(this.usuario)
  }

  habilito(){
    this.habilitarEdicion = true;
  }

  desabilito(){
    this.habilitarEdicion = false;
  }

  editarUser(fActualizar : NgForm){
    this.usuarioService.editarUsuario(this.usuario).subscribe(
      response => {
        this.status = 'Ok';
        if(response.user){
          console.log('Usuario editado')
          this.usuarioService.guardarUser(response.user);
          this.usuarioService.guardarToken(response.token);
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

  pruebaImg(){
    this.uiService.alertarInformativa('Prueba men');
  }

  

}
