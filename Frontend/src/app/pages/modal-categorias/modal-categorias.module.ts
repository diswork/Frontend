import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalCategoriasPage } from './modal-categorias.page';
import { PipesModule } from 'src/app/pipes/pipes.module';




@NgModule({
  entryComponents: [],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule
  ],
  declarations: [ModalCategoriasPage]
})
export class ModalCategoriasPageModule { }
