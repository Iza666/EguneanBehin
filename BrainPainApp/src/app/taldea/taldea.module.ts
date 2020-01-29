import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaldeaPageRoutingModule } from './taldea-routing.module';

import { TaldeaPage } from './taldea.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaldeaPageRoutingModule
  ],
  declarations: [TaldeaPage]
})
export class TaldeaPageModule {}
