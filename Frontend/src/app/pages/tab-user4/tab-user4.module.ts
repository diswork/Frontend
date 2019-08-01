import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabUser4Page } from './tab-user4.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { ModalOfertPage } from '../modal-ofert/modal-ofert.page';
import { ModalOfertPageModule } from '../modal-ofert/modal-ofert.module';

const routes: Routes = [
  {
    path: '',
    component: TabUser4Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    ModalOfertPageModule
  ],
  entryComponents : [
    ModalOfertPage
  ],
  declarations: [TabUser4Page]
})
export class TabUser4PageModule {}
