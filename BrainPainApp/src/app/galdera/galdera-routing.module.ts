import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GalderaPage } from './galdera.page';

const routes: Routes = [
  {
    path: '',
    component: GalderaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GalderaPageRoutingModule {}
