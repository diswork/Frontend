import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabEmpresa2Page } from './tab-empresa2.page';

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
    RouterModule.forChild(routes)
  ],
  declarations: [TabEmpresa2Page]
})
export class TabEmpresa2PageModule {}
