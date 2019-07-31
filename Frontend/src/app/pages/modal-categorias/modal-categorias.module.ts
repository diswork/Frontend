import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalCategoriasPage } from './modal-categorias.page';
import { ModalAddCategoriesPage } from '../modal-add-categories/modal-add-categories.page';
import { ModalAddCategoriesPageModule } from '../modal-add-categories/modal-add-categories.module';




@NgModule({
  entryComponents: [
    ModalAddCategoriesPage
  ],
  imports: [
    ModalAddCategoriesPageModule,
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [ModalCategoriasPage]
})
export class ModalCategoriasPageModule {}
