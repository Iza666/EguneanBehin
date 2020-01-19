import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KargatzenPage } from './kargatzen.page';

const routes: Routes = [
  {
    path: '',
    component: KargatzenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KargatzenPageRoutingModule {}
