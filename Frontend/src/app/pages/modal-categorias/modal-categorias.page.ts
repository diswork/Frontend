import { Component, OnInit, ViewChild, Input, Output } from '@angular/core';
import { ModalController, AlertController, IonList } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Categoria } from 'src/app/models/categoria.model';

@Component({
  selector: 'app-modal-categorias',
  templateUrl: './modal-categorias.page.html',
  styleUrls: ['./modal-categorias.page.scss'],
})
export class ModalCategoriasPage implements OnInit {

  @ViewChild('cerrarLista') lista: IonList;
  @Input() idCategoria: String

  public status;
  public categorias: Categoria
  public newCategorie: Categoria
  public textoBuscar = '';
  public editando = false



  constructor(private modalCtrl: ModalController, private categoriaService: UsuarioService, private alertCtrl: AlertController) {
    this.newCategorie = new Categoria('', '')
  }

  ngOnInit() {
    this.getCategorias()
  }



  async openDeleteAlert(id) {
    var identificador = id
    const alert = await this.alertCtrl.create({
      header: 'Eliminar Categoria',
      buttons: [{
        text: 'Si',
        role: 'Si',
        cssClass: 'secondary',
        handler: () => {
          this.deleteCategorie(identificador)
          this.lista.closeSlidingItems()

        }
      },
      {
        text: 'No',
        handler: () => {
          this.lista.closeSlidingItems()
        }
      }
      ]
    });
    alert.present();
  }

  // async openUpdateCategorie(id) {
  //   //  this.idCategoria = id

  //   this.idCategoria = id

  //   const modal = await this.modalCtrl.create({
  //     component: ModalUpdateCategoriesPage,

  //   });


  //   await modal.present();

  // }

  activarEdicion() {
    this.editando = true
    this.newCategorie.descripcion = ''

  }

  desactivarEdicion() {
    this.editando = false
    this.newCategorie.descripcion = ''
  }

  salir() {
    this.modalCtrl.dismiss();
  }

  buscar(event) {
    this.textoBuscar = event.detail.value;
  }

  getCategorias() {
    this.categoriaService.getCategorias().subscribe(
      response => {
        if (response.categorias) {
          this.categorias = response.categorias
        }
      },
      error => {
        if (error) {
          console.log(<any>error);
          this.status = error
        }
      }
    )
  }

  getIdCategoria(id) {
    id = this.categorias
    console.log(id)
  }

  deleteCategorie(id) {
    this.categoriaService.deleteCategorie(id).subscribe(
      response => {
        if (response.equipo) {
          this.getCategorias();
        }
      },
      error => {
        if (error) {
          console.log(<any>error);
        }
      }
    )
  }

  addCategoria() {
    this.categoriaService.addCategorie(this.newCategorie).subscribe(
      response => {
        if (response.categoria) {
          this.editando = false
          this.getCategorias();
        }
      },
      error => {
        if (error) {
          console.log(<any>error);

        }
      }
    )
  }

  updateCategorie() {
    this.editando = true;
  }


}
