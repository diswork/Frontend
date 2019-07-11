import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular'
import { UsuarioService } from '../../services/usuario.service'
import { UiServiceService } from '../../services/ui-service.service'
import { Login } from '../../models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginUser : Login;
  public status;

  @ViewChild('slidePrincipal') slides : IonSlides;

  avatars = [
      {
        img: 'av-1.png',
        seleccionado: true
      },
      {
        img: 'av-2.png',
        seleccionado: false
      },
      {
        img: 'av-3.png',
        seleccionado: false
      },
      {
        img: 'av-4.png',
        seleccionado: false
      },
      {
        img: 'av-5.png',
        seleccionado: false
      },
      {
        img: 'av-6.png',
        seleccionado: false
      },
      {
        img: 'av-7.png',
        seleccionado: false
      },
      {
        img: 'av-8.png',
        seleccionado: false
      },
  ];


  constructor(private usuarioService : UsuarioService, 
              private navCtrl : NavController,
              private uiService : UiServiceService ) {
    this.loginUser = new Login("","",true)
   }

  ngOnInit() {
    this.slides.lockSwipes(true);
  }

  seleccionarAvatar(avatar){

    this.avatars.forEach(element => element.seleccionado = false);
     
    avatar.seleccionado = true;      
    
  }

  mostrarLogin(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

  mostrarRegistro(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }

  login( fLogin : NgForm){

    console.log(fLogin.valid);
    this.usuarioService.login(this.loginUser).subscribe(
      response => {
        this.status = 'Ok';
        
        if(response.empresa){
          console.log(response.token);
          console.log(response.empresa);
          this.navCtrl.navigateRoot('tabs-empresa/tabs-empresa/tab-empresa1', {animated : true})
        }else if(response.user){
          console.log(response.token);
          console.log(response.user);
          this.navCtrl.navigateRoot('tabs-user/tabs-user/tab-user1', {animated : true})
        }

        if(response.token){
          this.usuarioService.guardarToken(response.token);
        }        
      },
      error => {
          if(error){
          console.log(<any>error);
          this.status = 'error';
          this.usuarioService.limpiarStorage();
          this.uiService.alertarInformativa('El correo y la contraseña no son correctos.')
        }
      }
    )
  }

  

  registro(fRegistro : NgForm){

    console.log(fRegistro.valid);

  }

}
