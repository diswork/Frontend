import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabAdmin3Page } from './tab-admin3.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { ModalCategoriasPage } from '../modal-categorias/modal-categorias.page';
import { ModalCategoriasPageModule } from '../modal-categorias/modal-categorias.module';

const routes: Routes = [
  {
    path: '',
    component: TabAdmin3Page
  }
];

@NgModule({
  entryComponents:[
    ModalCategoriasPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    ModalCategoriasPageModule
  ],
  declarations: [TabAdmin3Page]
})
export class TabAdmin3PageModule {}
