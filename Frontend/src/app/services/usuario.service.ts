import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Login } from '../models/login.model';
import { Observable } from 'rxjs';
import { GLOBAL } from './global.service';
import { User } from '../models/user.model';
import { Empresa } from '../models/empresa.model';
import { NavController } from '@ionic/angular';

import { delay } from 'rxjs/operators'
import { Admin } from '../models/admin.model';
import { Oferta } from '../models/oferta.model';
import { CvRedactado } from '../models/cvRedactado.model';
import { Categoria } from '../models/categoria.model';
import { NivelAcademico } from '../models/nivelAcademico.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string = null;
  public usuario: User;
  public empresa: Empresa;
  public admin: Admin
  public url: String;

  constructor(public _http: HttpClient,
    private storage: Storage,
    private navCtrl: NavController) {
    this.url = GLOBAL.url;
  }


  login(login: Login): Observable<any> {
    let params = JSON.stringify(login);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'login', params, { headers: headers });
  }

  async guardarToken(token: string) {
    this.token = token;
    await this.storage.set('token', token);

    await this.validaToken();
  }

  async cargarToken() {
    this.token = await this.storage.get('token') || null;
  }

  async validaToken(): Promise<boolean> {

    await this.cargarToken();

    if (!this.token) {
      this.navCtrl.navigateRoot('/login', { animated: true })
      return Promise.resolve(false);
    }

    return new Promise<boolean>(resolve => {
      const headers = new HttpHeaders({ 'Authorization': this.token });

      this._http.get(this.url + 'verificaToken', { headers }).subscribe(
        resp => {
          if (resp['ok']) {
            if (resp['usuario']) {
              this.guardarUser(resp['usuario']);
              resolve(true);
            } else if (resp['empresa']) {
              this.guardarEmpresa(resp['empresa']);
              resolve(true);
            } else if (resp['admin']) {
              this.guardarAdmin(resp['admin']);
              resolve(true);
            }

          } else {
            this.navCtrl.navigateRoot('/login', { animated: true })
            resolve(false)
          }
        }
      )
    })


  }


  limpiarStorage() {
    this.token = null;
    this.usuario = null;
    this.admin = null;
    this.storage.clear();
    this.validaToken();
  }

  //SERVICIOS PARA USUARIO DE TIPO USER

  async guardarUser(user: User) {
    this.usuario = user;
    await this.storage.set('user', user);
  }

  getUserLog() {

    if (!this.usuario._id) {
      this.validaToken()
    }

    return { ...this.usuario }
  }
  getToken() {
    return this.token;
  }

  registrarUser(user: User): Observable<any> {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'registrar', params, { headers: headers });
  }

  editarUsuario(user: User): Observable<any> {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);

    return this._http.put(this.url + `/editar-usuario/${user._id}`, params, { headers: headers }).pipe(delay(500));
  }

  seguirEmpresa(id, empresa: Empresa): Observable<any> {
    // let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',this.token);
    ;
    let params = JSON.stringify(empresa)
    const headers = new HttpHeaders({
      'Authorization': this.token
    });
    return this._http.put(this.url + `seguir-empresa/${id}`, params, { headers: headers });
  }

  dejarSeguirEmpresa(id, empresa: Empresa): Observable<any> {
    // let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',this.token);
    ;
    let params = JSON.stringify(empresa)
    const headers = new HttpHeaders({
      'Authorization': this.token
    });
    return this._http.put(this.url + `dejar-de-seguir-empresa/${id}`, params, { headers: headers });
  }

  getUser(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);

    return this._http.get(this.url + `usuario/${id}`, { headers: headers });
  }

  getUsers(): Observable<any> {
    console.log(this.token)
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);

    return this._http.get(this.url + 'usuarios', { headers }).pipe(delay(1500));
  }

  deleteUser(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);

    return this._http.delete(this.url + `usuario/${id}`, { headers: headers });
  }

  redactarCv(cv: CvRedactado): Observable<any> {
    let params = JSON.stringify(cv);
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);

    return this._http.put(this.url + 'cvRedactado', params, { headers: headers });
  }

  getOfertasPorEmpresa(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);

    return this._http.get(this.url + `ofertas-seguidas`, { headers });
  }

  deleteEmpresa(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);

    return this._http.delete(this.url + `empresa/${id}`, { headers: headers });
  }

  enviarCv(id, archivo): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);
    let params = JSON.stringify(archivo);

    return this._http.put(this.url + `enviar-cv-img/${id}`, params, { headers });
  }

  //SERVICIOS PARA USUARIO DE TIPO EMPRESA

  async guardarEmpresa(empresas: Empresa) {
    this.empresa = empresas;

    await this.storage.set('empresa', empresas);
  }

  getEmpresaLog() {

    if (!this.empresa._id) {
      this.validaToken()
    }



    return { ...this.empresa }
  }



  getAdminLog() {

    if (!this.admin._id) {
      this.validaToken()
    }

    return { ...this.admin }
  }


  registrarEmpresa(empresa: Empresa): Observable<any> {
    let params = JSON.stringify(empresa);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'registrar', params, { headers: headers });
  }

  readOfertaEmpresa(id): Observable<any> {
    console.log(id)
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);

    return this._http.get(this.url + `/ofertasPorEmpresa/${id}`, { headers }).pipe(delay(2000));
  }

  getEmpresas(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);

    return this._http.get(this.url + 'empresas', { headers }).pipe(delay(2000));
  }

  getEmpresa(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);

    return this._http.get(this.url + `empresa/${id}`, { headers });
  }

  getUsuariosPorEmpresa(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);

    return this._http.get(this.url + 'followers', { headers })
  }

  //SERVICIOS PARA NIVEL ACADEMICO
  getNivelesAcademicos(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);
    return this._http.get(this.url + 'niveles-academicos', { headers })
  }

  addNivelAcademico(nivelAcademico: NivelAcademico): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);
    let params = JSON.stringify(nivelAcademico);

    return this._http.post(this.url + 'nivel-academico', params, { headers });
  }

  deleteNivelAcademico(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);

    return this._http.delete(this.url + `/nivel-academico/${id}`, { headers })
  }

  updateNivelAcademico(id, nivelAcademico: NivelAcademico): Observable<any> {
    let params = JSON.stringify(nivelAcademico);
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);

    return this._http.put(this.url + `nivel-academico/${id}`, params, { headers: headers }).pipe(delay(500));
  }

  addPropuesta(oferta: Oferta): Observable<any> {
    let params = JSON.stringify(oferta);
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);
    return this._http.post(this.url + 'oferta', params, { headers });
  }

  //SERVICIOS PARA CATEGORIAS
  getCategorias(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);

    return this._http.get(this.url + 'categorias', { headers })
  }

  addCategorie(categorie: Categoria): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);
    let params = JSON.stringify(categorie)

    return this._http.post(this.url + 'categoria', params, { headers })
  }

  deleteCategorie(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);

    return this._http.delete(this.url + `/categoria/${id}`, { headers })

  }

  updateCategorie(id, categoria: Categoria): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);
    let params = JSON.stringify(categoria)

    return this._http.put(this.url + `categoria/${id}`, params, { headers: headers }).pipe(delay(500));
  }

  getNiveles(): Observable<any> {
    this.cargarToken()

    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);

    return this._http.get(this.url + 'niveles-academicos', { headers })
  }

  //SERVICIOS PARA ADMIN

  async guardarAdmin(admins: Admin) {
    this.admin = admins;
    await this.storage.set('admin', admins);
  }

  getAdmins(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'admins', { headers: headers });

  }


  //SERVICIOS PARA OFERTAS

  getOfertaById(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);

    return this._http.get(this.url + `ofertaById/${id}`, { headers })
  }

  crearAdmin(admin: Admin): Observable<any> {
    let params = JSON.stringify(admin);
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);

    return this._http.post(this.url + 'crear-admin', params, { headers: headers });
  }

  editarAdmin(admin: Admin): Observable<any> {
    let params = JSON.stringify(admin);
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);

    return this._http.put(this.url + `/editar-Admin/${admin._id}`, params, { headers: headers });
  }

  getAdmin(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);

    return this._http.get(this.url + `admin/${id}`, { headers: headers });
  }

  deleteAdmin(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);

    return this._http.delete(this.url + `admin/${id}`, { headers: headers });

  }

  eliminarOferta(id): Observable<any> {

    let headers = new HttpHeaders().set('Content-Type', 'application/json')

    return this._http.delete(this.url + 'eliminar-oferta/' + id, { headers: headers })
  }

  editarEmpresa(empresa: Empresa): Observable<any> {
    let params = JSON.stringify(empresa);
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);

    return this._http.put(this.url + `/editar-empresa/${empresa._id}`, params, { headers: headers }).pipe(delay(500));
  }


  //SERVICIOS PARA OFERTAS

  getOfertas(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);

    return this._http.get(this.url + 'ofertas-seguidas-cn', { headers });
  }

  editPropuesta(oferta: Oferta): Observable<any> {
    let params = JSON.stringify(oferta);
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);

    return this._http.put(this.url + `oferta/${oferta._id}`, params, { headers });
  }


}