import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController, MenuController } from '@ionic/angular'
import { UsuarioService } from '../../services/usuario.service'
import { UiServiceService } from '../../services/ui-service.service'
import { Login } from '../../models/login.model';
import { User } from 'src/app/models/user.model';
import { Empresa } from 'src/app/models/empresa.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginUser: Login;
  public status;
  public habilitarDireccion = true;

  public user: User;
  public empresa: Empresa;
  public rol: string;

  @ViewChild('slidePrincipal') slides: IonSlides;

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


  constructor(private usuarioService: UsuarioService,
              private navCtrl: NavController,
              private uiService: UiServiceService,
              private menuCtrl: MenuController) {
    this.loginUser = new Login("", "", true)
    this.user = new User("","", "", "", "user", "", "", [], [])
    this.empresa = new Empresa("","", "", "", "empresa", "", "", "")
    this.rol = "user"
  }

  ngOnInit() {
    this.slides.lockSwipes(true);
    this.menuCtrl.enable(false);
  }

  seleccionarAvatar(avatar) {

    this.avatars.forEach(element => element.seleccionado = false);

    avatar.seleccionado = true;

  }

  mostrarLogin() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

  mostrarRegistro() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }

  login(fLogin: NgForm) {

    console.log(fLogin.valid);

    //if(fLogin.invalid) return;

    this.usuarioService.login(this.loginUser).subscribe(
      response => {
        this.status = 'Ok';
        if (response.token) {
          this.usuarioService.guardarToken(response.token);
          this.usuarioService.guardarUser(response.user)
        }
        if (response.empresa) {
          console.log(response.token);
          console.log(response.empresa);
          this.menuCtrl.enable(true);
          this.navCtrl.navigateRoot('tabs-empresa/tabs-empresa/tab-empresa1', { animated: true })
        } else if (response.user) {
          console.log(response.token);
          console.log(response.user);
          this.menuCtrl.enable(true);
          this.navCtrl.navigateRoot('tabs-user/tabs-user/tab-user1', { animated: true })
        }

        
      },
      error => {
        if (error) {
          console.log(<any>error);
          this.status = 'error';
          this.usuarioService.limpiarStorage();
          this.uiService.alertarInformativa('El correo y la contraseña no son correctos.')
        }
      }
    )
  }

  desabilitar() {
    this.habilitarDireccion = true;
    this.rol = "user";
  }

  habilitar() {
    this.habilitarDireccion = false;
    this.rol = "empresa";
  }

  registro(fRegistro: NgForm) {

    console.log(fRegistro.valid);
    if (fRegistro.invalid) {
      this.uiService.alertarInformativa('Ingrese todos los campos.')
    } else {
      if (this.rol === "user") {
        console.log(this.user)

        this.usuarioService.registrarUser(this.user).subscribe(
          response => {
            console.log(response.user);
            this.user = new User("","", "", "", "user", "", "", [], [])
            this.mostrarLogin();
          },
          error => {
            if (error) {
              if (error.error.message == "El usuario ya existe") {
                this.uiService.alertarInformativa('El usuario ya existe.')
              }
              console.log(<any>error);
              this.status = 'error';
            }
          }
        )
      } else if (this.rol === "empresa") {
        this.empresa.nombre = this.user.nickName;
        this.empresa.email = this.user.email;
        this.empresa.password = this.user.password;
        this.empresa.telefono = this.user.telefono;
        console.log(this.empresa)
        this.usuarioService.registrarEmpresa(this.empresa).subscribe(
          response => {
            this.user = new User("","", "", "", "user", "", "", [], [])
            this.empresa = new Empresa("","", "", "", "empresa", "", "", "")
            console.log(response.empresa);
            this.mostrarLogin();
          },
          error => {
            if (error) {
              if (error.error.message == "El usuario ya existe") {
                this.uiService.alertarInformativa('El usuario ya existe.')
              }
              console.log(<any>error);
              this.status = 'error';
            }
          }
        )
      }
    }

  }

}
