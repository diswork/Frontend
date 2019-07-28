import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabEmpresa3Page } from './tab-empresa3.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { ModalEmpresaPageModule } from '../modal-empresa/modal-empresa.module';
import { ModalUserPage } from '../modal-user/modal-user.page';
import { ModalEmpresaPage } from '../modal-empresa/modal-empresa.page';

const routes: Routes = [
  {
    path: '',
    component: TabEmpresa3Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    ModalEmpresaPageModule
  ],
  entryComponents: [
    ModalEmpresaPage
  ],
  declarations: [TabEmpresa3Page]
})
export class TabEmpresa3PageModule {}
