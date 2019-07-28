import { Injectable } from '@angular/core';
import { GLOBAL } from './global.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { UsuarioService } from './usuario.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class UploadService {


  public url: string;


  constructor(
    public _http: HttpClient,
    private fileTransfer: FileTransfer,
    private _usuarioService: UsuarioService) {
    this.url = GLOBAL.url;
  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File>, name: string, token: string) {
    return new Promise(function (resolve, reject) {
      var formData: any = new FormData(); //para traer el tipo de dato al abrir la ventana
      var xhr = new XMLHttpRequest; //peticion por medio de http

      for (var i = 0; i < files.length; i++) {
        formData.append(name, files[i], files[i].name);
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) { //stado que dice que si envio los archivos
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
        console.log(token)


        xhr.open('POST', url, true); //tipo, url, asincrono
        xhr.setRequestHeader('Authorization', token);//
        xhr.send(formData);//enviamos los datos ya parseados
      })
  }

  async subirImagen(img: string) {
    const options: FileUploadOptions = {
      fileKey: 'cv',
      headers: {
        'Authorization': this._usuarioService.getToken()
      }
    };

    const fileTransfer: FileTransferObject = this.fileTransfer.create();

    fileTransfer.upload(img, this.url + '/subir-cv',options)
      .then( async data => {
        let dt = JSON.stringify(data.response);
        let token = dt.split('\\\"')
        console.log('token: ' + token[3])
        await this._usuarioService.guardarToken(token[3]);
      }).catch(err => {
        console.log('Error en carga', err);
      });
  }

  subirImagenOferta(img: string, id) {
    const options: FileUploadOptions = {
      fileKey: 'imagen',
      headers: {
        'Authorization': this._usuarioService.getToken()
      }
    };

    const fileTransfer: FileTransferObject = this.fileTransfer.create();

    fileTransfer.upload(img, this.url + `subir-imagen-oferta/${id}`, options)
      .then(data => {
        console.log(data)
      }).catch(err => {
        console.log('Error en carga', err);
      });
  }

  subirImagenUsuario(img: string, id): boolean {
    const options: FileUploadOptions = {
      fileKey: 'image',
      headers: {
        'Authorization': this._usuarioService.getToken()
      }
    };

    let editada = false;
    const fileTransfer: FileTransferObject = this.fileTransfer.create();

    fileTransfer.upload(img, this.url + `/subir-imagen-usuario/${id}`, options)
      .then(async data => {
        let dt = JSON.stringify(data.response);
        let token = dt.split('\\\"')
        console.log('token: ' + token[3])
        await this._usuarioService.guardarToken(token[3]);
        editada = true;
      }).catch(err => {
        console.log('Error en carga', err);
      });
    if (editada) {
      return true
    }

  }

  subirImagenEmpresa(img: string, id): boolean {
    const options: FileUploadOptions = {
      fileKey: 'image',
      headers: {
        'Authorization': this._usuarioService.getToken()
      }
    };

    let editada = false;
    const fileTransfer: FileTransferObject = this.fileTransfer.create();

    fileTransfer.upload(img, this.url + `/subir-imagen-empresa/${id}`, options)
      .then(async data => {
        let dt = JSON.stringify(data.response);
        let token = dt.split('\\\"');
        console.log('token: ' + token[3]);
        await this._usuarioService.guardarToken(token[3]);
        editada = true;
      }).catch(err => {
        console.log('Error en carga', err);
      });
    if (editada) {
      return true;
    }

  }


}

