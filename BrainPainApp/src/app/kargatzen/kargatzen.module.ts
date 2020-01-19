import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KargatzenPageRoutingModule } from './kargatzen-routing.module';

import { KargatzenPage } from './kargatzen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KargatzenPageRoutingModule
  ],
  declarations: [KargatzenPage]
})
export class KargatzenPageModule {}
