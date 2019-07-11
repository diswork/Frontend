import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabEmpresa3Page } from './tab-empresa3.page';

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
    RouterModule.forChild(routes)
  ],
  declarations: [TabEmpresa3Page]
})
export class TabEmpresa3PageModule {}
