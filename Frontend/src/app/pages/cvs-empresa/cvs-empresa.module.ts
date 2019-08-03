import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CvsEmpresaPage } from './cvs-empresa.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
   
  ],
  declarations: [CvsEmpresaPage]
})
export class CvsEmpresaPageModule {}
