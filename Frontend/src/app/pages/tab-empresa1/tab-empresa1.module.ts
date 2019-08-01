import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabEmpresa1Page } from './tab-empresa1.page';
import { ComponentsModule } from '../../components/components.module';
import { CvsEmpresaPage } from '../cvs-empresa/cvs-empresa.page';
import { CvsEmpresaPageModule } from '../cvs-empresa/cvs-empresa.module';

const routes: Routes = [
  {
    path: '',
    component: TabEmpresa1Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    CvsEmpresaPageModule
  ],
  entryComponents: [
    CvsEmpresaPage
  ],
  declarations: [TabEmpresa1Page]
})
export class TabEmpresa1PageModule {}
