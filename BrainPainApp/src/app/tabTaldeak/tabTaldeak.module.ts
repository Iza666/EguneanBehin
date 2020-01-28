import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabTaldeakPage } from './tabTaldeak.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: TabTaldeakPage }])
  ],
  declarations: [TabTaldeakPage]
})
export class TabTaldeakPageModule {}
