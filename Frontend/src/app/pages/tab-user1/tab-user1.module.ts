import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabUser1Page } from './tab-user1.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { ModalCvPage } from '../modal-cv/modal-cv.page';
import { ModalCvPageModule } from '../modal-cv/modal-cv.module';

const routes: Routes = [
  {
    path: '',
    component: TabUser1Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    ModalCvPageModule
  ],
  entryComponents : [
    ModalCvPage
  ],
  declarations: [TabUser1Page]
})
export class TabUser1PageModule {}
