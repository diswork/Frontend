import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Categoria } from 'src/app/models/categoria.model';

@Component({
  selector: 'app-modal-add-categories',
  templateUrl: './modal-add-categories.page.html',
  styleUrls: ['./modal-add-categories.page.scss'],
})
export class ModalAddCategoriesPage implements OnInit {

  public newCategorie: Categoria
  public status;


  constructor( private modalCtrl : ModalController, private categoriaService:UsuarioService) { 
    this.newCategorie = new Categoria('','')
  }

  ngOnInit() {
  }

  salir() {
    this.modalCtrl.dismiss();
  }

  addCategoria() {
    this.categoriaService.addCategorie(this.newCategorie).subscribe(
      response => {
        if (response.categoria) {
          console.log(response.categoria._id);
          this.salir();
        }
      },
      error => {
        if (error) {
          console.log(<any>error);
          this.status = 'error'
        }
      }
    )


  }

}
