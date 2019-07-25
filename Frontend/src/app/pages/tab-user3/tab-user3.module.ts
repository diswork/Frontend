import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabUser3Page } from './tab-user3.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { ModalUserPage } from '../modal-user/modal-user.page';
import { ModalUserPageModule } from '../modal-user/modal-user.module';

const routes: Routes = [
  {
    path: '',
    component: TabUser3Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    ModalUserPageModule
  ],
  entryComponents: [
    ModalUserPage
  ],
  declarations: [TabUser3Page]
})
export class TabUser3PageModule {}
