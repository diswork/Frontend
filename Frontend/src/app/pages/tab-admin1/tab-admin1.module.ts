import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabAdmin1Page } from './tab-admin1.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ModalAdminUserPage } from '../modal-admin-user/modal-admin-user.page';
import { ModalAdminUserPageModule } from '../modal-admin-user/modal-admin-user.module';

const routes: Routes = [
  {
    path: '',
    component: TabAdmin1Page
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
    ModalAdminUserPageModule
  ],
  entryComponents: [
    ModalAdminUserPage
  ],
  declarations: [TabAdmin1Page]
})
export class TabAdmin1PageModule {}
