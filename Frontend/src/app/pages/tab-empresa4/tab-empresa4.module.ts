import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabEmpresa4Page } from './tab-empresa4.page';

const routes: Routes = [
  {
    path: '',
    component: TabEmpresa4Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabEmpresa4Page]
})
export class TabEmpresa4PageModule {}
