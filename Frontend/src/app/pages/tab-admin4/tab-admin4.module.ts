import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabAdmin4Page } from './tab-admin4.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { ModalAdminPage } from '../modal-admin/modal-admin.page';
import { ModalAdminPageModule } from '../modal-admin/modal-admin.module';

const routes: Routes = [
  {
    path: '',
    component: TabAdmin4Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    ModalAdminPageModule
  ],
  entryComponents: [
    ModalAdminPage
  ],
  declarations: [TabAdmin4Page]
})
export class TabAdmin4PageModule {}
