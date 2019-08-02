import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabAdmin2Page } from './tab-admin2.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ModalAdminEmpresaPageModule } from '../modal-admin-empresa/modal-admin-empresa.module';
import { ModalAdminEmpresaPage } from '../modal-admin-empresa/modal-admin-empresa.page';

const routes: Routes = [
  {
    path: '',
    component: TabAdmin2Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    PipesModule,
    ModalAdminEmpresaPageModule
  ],
  entryComponents: [
    ModalAdminEmpresaPage
  ],
  declarations: [TabAdmin2Page]
})
export class TabAdmin2PageModule {}
