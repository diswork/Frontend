import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsEmpresaPage } from './tabs-empresa.page';
import { ComponentsModule } from '../../components/components.module';

const routes: Routes = [
  {
    path: 'tabs-empresa',
    component: TabsEmpresaPage,
    children : [
      { path: 'tab-empresa1', loadChildren: '../tab-empresa1/tab-empresa1.module#TabEmpresa1PageModule' },
      { path: 'tab-empresa2', loadChildren: '../tab-empresa2/tab-empresa2.module#TabEmpresa2PageModule' },
      { path: 'tab-empresa3', loadChildren: '../tab-empresa3/tab-empresa3.module#TabEmpresa3PageModule' },
      { path: 'tab-empresa4', loadChildren: '../tab-empresa4/tab-empresa4.module#TabEmpresa4PageModule' },
    ]
  },
  {
    path:'',
    redirectTo: 'tabs-empresa/tab-empresa1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsEmpresaPage]
})
export class TabsEmpresaPageModule {}
