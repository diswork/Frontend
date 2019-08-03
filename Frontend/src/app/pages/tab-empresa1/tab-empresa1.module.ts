import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabEmpresa1Page } from './tab-empresa1.page';
import { ComponentsModule } from '../../components/components.module';
import { CvsEmpresaPage } from '../cvs-empresa/cvs-empresa.page';
import { CvsEmpresaPageModule } from '../cvs-empresa/cvs-empresa.module';
import { ModalEditarOfertaPageModule } from '../modal-editar-oferta/modal-editar-oferta.module';
import { ModalEditarOfertaPage } from '../modal-editar-oferta/modal-editar-oferta.page';

const routes: Routes = [
  {
    path: '',
    component: TabEmpresa1Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    CvsEmpresaPageModule,
    ModalEditarOfertaPageModule
  ],
  entryComponents: [
    CvsEmpresaPage,
    ModalEditarOfertaPage
  ],
  declarations: [TabEmpresa1Page]
})
export class TabEmpresa1PageModule {}
