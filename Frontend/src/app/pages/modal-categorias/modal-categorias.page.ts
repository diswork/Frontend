import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Categoria } from 'src/app/models/categoria.model';
import { ModalAddCategoriesPage } from '../modal-add-categories/modal-add-categories.page';

@Component({
  selector: 'app-modal-categorias',
  templateUrl: './modal-categorias.page.html',
  styleUrls: ['./modal-categorias.page.scss'],
})
export class ModalCategoriasPage implements OnInit {

  public status;
  public categorias: Categoria
  public newCategorie: Categoria
  public textoBuscar = '';


  constructor(private modalCtrl: ModalController, private categoriaService: UsuarioService) {
    this.newCategorie = new Categoria('','')
  }

  ngOnInit() {
    this.getCategorias()
  }

  async openAddCategorie() {
    
      const modal = await this.modalCtrl.create({
      

        component: ModalAddCategoriesPage,
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

  deleteCategorie() {
    this.categoriaService.deleteCategorie(this.categorias.id).subscribe(
      response => {

      }
    )
  }



}
