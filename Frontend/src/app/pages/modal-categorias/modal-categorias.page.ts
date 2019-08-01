import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, AlertController, IonList } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Categoria } from 'src/app/models/categoria.model';
import { ModalAddCategoriesPage } from '../modal-add-categories/modal-add-categories.page';
import { ModalUpdateCategoriesPage } from '../modal-update-categories/modal-update-categories.page';

@Component({
  selector: 'app-modal-categorias',
  templateUrl: './modal-categorias.page.html',
  styleUrls: ['./modal-categorias.page.scss'],
})
export class ModalCategoriasPage implements OnInit {

  @ViewChild('cerrarLista') lista: IonList;

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
          this.getCategorias();
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

  async openAddCategorie() {

    const modal = await this.modalCtrl.create({


      component: ModalAddCategoriesPage,
    });
    await modal.present();
  }

  async openUpdateCategorie() {
    const modal = await this.modalCtrl.create({


      component: ModalUpdateCategoriesPage,
    });
    await modal.present();
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

  deleteCategorie(id) {
    this.categoriaService.deleteCategorie(id).subscribe(
      response => {
        if(response.equipo) {
        }
      },
      error => {
        if(error){
          console.log(<any>error);
        }
      }
    )
  }

  updateCategorie() {
    this.editando = true;
  }


}
