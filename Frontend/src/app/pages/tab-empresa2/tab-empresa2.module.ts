import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabEmpresa2Page } from './tab-empresa2.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { ModalAdminUserPageModule } from '../modal-admin-user/modal-admin-user.module';
import { ModalAdminUserPage } from '../modal-admin-user/modal-admin-user.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ModalEmpresaUserPageModule } from '../modal-empresa-user/modal-empresa-user.module';
import { ModalEmpresaUserPage } from '../modal-empresa-user/modal-empresa-user.page';

const routes: Routes = [
  {
    path: '',
    component: TabEmpresa2Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    ModalEmpresaUserPageModule,
    PipesModule
  ],
  entryComponents : [
    ModalEmpresaUserPage
  ],
  declarations: [TabEmpresa2Page]
})
export class TabEmpresa2PageModule {}
