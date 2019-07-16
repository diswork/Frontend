import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsAdminPage } from './tabs-admin.page';
import { ComponentsModule } from 'src/app/components/components.module';

const routes: Routes = [
  {
    path: 'tabs-admin',
    component: TabsAdminPage,
    children : [
      { path: 'tab-admin1', loadChildren: '../tab-admin1/tab-admin1.module#TabAdmin1PageModule' },
      { path: 'tab-admin2', loadChildren: '../tab-admin2/tab-admin2.module#TabAdmin2PageModule' },
      { path: 'tab-admin3', loadChildren: '../tab-admin3/tab-admin3.module#TabAdmin3PageModule' },
      { path: 'tab-admin4', loadChildren: '../tab-admin4/tab-admin4.module#TabAdmin4PageModule' },
    ]
  },
  {
    path: '',
    redirectTo : 'tabs-admin/tab-admin1',
    pathMatch : 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  declarations: [TabsAdminPage]
})
export class TabsAdminPageModule {}
