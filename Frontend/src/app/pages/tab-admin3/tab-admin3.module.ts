import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabAdmin3Page } from './tab-admin3.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { ModalCategoriasPage } from '../modal-categorias/modal-categorias.page';
import { ModalCategoriasPageModule } from '../modal-categorias/modal-categorias.module';
import { ModalNivelesAcademicosPage } from '../modal-niveles-academicos/modal-niveles-academicos.page';
import { ModalNivelesAcademicosPageModule } from '../modal-niveles-academicos/modal-niveles-academicos.module';
import { ModalGestionarAdministradoresPage } from '../modal-gestionar-administradores/modal-gestionar-administradores.page';
import { ModalGestionarAdministradoresPageModule } from '../modal-gestionar-administradores/modal-gestionar-administradores.module';

const routes: Routes = [
  {
    path: '',
    component: TabAdmin3Page
  }
];

@NgModule({
  entryComponents:[
    ModalCategoriasPage,
    ModalNivelesAcademicosPage,
    ModalGestionarAdministradoresPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    ModalCategoriasPageModule,
    ModalNivelesAcademicosPageModule,
    ModalGestionarAdministradoresPageModule
  ],
  declarations: [TabAdmin3Page]
})
export class TabAdmin3PageModule {}
