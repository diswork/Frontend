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
  public carga: boolean = false;
  public cargaLista: boolean = false;
  public formulario: boolean = true;

  @ViewChild('slidePrincipal') slides: IonSlides;

  constructor(private usuarioService: UsuarioService,
    private navCtrl: NavController,
    private uiService: UiServiceService,
    private menuCtrl: MenuController) {
    this.loginUser = new Login("", "", true)
    this.user = new User("", "", "", "", "user", "", "", "", "", new Date(), [], [], [], "", "")
    this.empresa = new Empresa("", "", "", "", "empresa", "", "", "")
    this.rol = "user"
    this.carga = false;
    this.cargaLista = false;
    this.formulario = true;
  }

  ngOnInit() {
    this.slides.lockSwipes(true);
    this.menuCtrl.enable(false, "primerMenu");
    this.menuCtrl.enable(false, "segundoMenu");
    this.menuCtrl.enable(false, "tercerMenu");
  }

  mostrarLogin(fRegistro : NgForm) {
    fRegistro.reset()
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
    this.user = new User("", "", "", "", "user", "", "", "", "", new Date(), [], [], [], "", "")
    this.empresa = new Empresa("", "", "", "", "empresa", "", "", "")
    this.loginUser = new Login("", "", true)
  }

  mostrarRegistro(fLogin : NgForm) {
    fLogin.reset()
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }

  login(fLogin: NgForm) {

    console.log(fLogin.valid);

    if (fLogin.valid) {
      setTimeout(()=>{
        this.formulario = false;
        this.carga = true;
        this.usuarioService.login(this.loginUser).subscribe(
          response => {
            this.status = 'Ok';
              if (response.token) {
                this.usuarioService.guardarToken(response.token);
              }
              if (response.empresa) {
                this.usuarioService.guardarEmpresa(response.empresa);
                this.menuCtrl.enable(true, "segundoMenu");
                this.menuCtrl.enable(false, "primerMenu");
                this.menuCtrl.enable(false, "tercerMenu");                       
                setTimeout(()=>{ 
                  this.carga = false;
                  this.cargaLista = true;   
                  this.navCtrl.navigateRoot('tabs-empresa/tabs-empresa/tab-empresa1', { animated: true })
                },1000);
              } else if (response.user) {
                this.usuarioService.guardarUser(response.user);
                this.menuCtrl.enable(true, "primerMenu");
                this.menuCtrl.enable(false, "segundoMenu");
                this.menuCtrl.enable(false, "tercerMenu");
                setTimeout(()=>{ 
                  this.carga = false;
                  this.cargaLista = true;
                  this.navCtrl.navigateRoot('tabs-user/tabs-user/tab-user1', { animated: true })
                },1000);
              } else if (response.admin) {
                this.usuarioService.guardarAdmin(response.admin);
                this.menuCtrl.enable(false, "primerMenu");
                this.menuCtrl.enable(false, "segundoMenu");
                this.menuCtrl.enable(true, "tercerMenu");                
                setTimeout(()=>{ 
                  this.carga = false;
                  this.cargaLista = true;
                  this.navCtrl.navigateRoot('tabs-admin/tabs-admin/tab-admin1', { animated: true })
                },1000);
              }        
          },
          error => {
            this.formulario = true;
            this.carga = false;
            if (error) {
              console.log(<any>error);
              this.status = 'error';
              this.usuarioService.limpiarStorage();
              if(error.error.message === "El usuario no existe"){
                this.uiService.alertarInformativa('El usuario no existe.<br>Cree una cuenta.');
              }else if(error.error.message === 'El email o la contraseña son incorrectos'){
                this.uiService.alertarInformativa('El correo y la contraseña no son correctos.');
              }
            }
          }
        )
      },1000)      
    }else if(fLogin.invalid){
      this.uiService.alertarInformativa('Ingrese todos los campos.')
    }
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
              console.log('Usuario guardado');
              this.mostrarLogin(fRegistro);          
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
            console.log('Empresa guardada')
            this.mostrarLogin(fRegistro);
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
