import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalOfertPage } from './modal-ofert.page';
import { ModalCvPage } from '../modal-cv/modal-cv.page';
import { ModalCvPageModule } from '../modal-cv/modal-cv.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalCvPageModule
  ],
  entryComponents : [
    ModalCvPage
  ],
  declarations: [ModalOfertPage]
})
export class ModalOfertPageModule {}
