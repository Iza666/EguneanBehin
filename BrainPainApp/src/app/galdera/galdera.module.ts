import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GalderaPageRoutingModule } from './galdera-routing.module';

import { GalderaPage } from './galdera.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GalderaPageRoutingModule
  ],
  declarations: [GalderaPage]
})
export class GalderaPageModule {}
