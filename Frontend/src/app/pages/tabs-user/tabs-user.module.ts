import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsUserPage } from './tabs-user.page';

const routes: Routes = [
  {
    path: 'tabs-user',
    component: TabsUserPage,
    children : [
      { path: 'tab-user1', loadChildren: '../tab-user1/tab-user1.module#TabUser1PageModule' },
      { path: 'tab-user2', loadChildren: '../tab-user2/tab-user2.module#TabUser2PageModule' },
      { path: 'tab-user3', loadChildren: '../tab-user3/tab-user3.module#TabUser3PageModule' },
      { path: 'tab-user4', loadChildren: '../tab-user4/tab-user4.module#TabUser4PageModule' },
    ]
  },
  {
    path: '',
    redirectTo:'tabs-user/tab-user1',
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
  declarations: [TabsUserPage]
})
export class TabsUserPageModule {}
