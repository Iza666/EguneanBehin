import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaldeaPage } from './taldea.page';

const routes: Routes = [
  {
    path: '',
    component: TaldeaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaldeaPageRoutingModule {}
