import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'galdera',
    loadChildren: () => import('./galdera/galdera.module').then( m => m.GalderaPageModule)
  },
  { path:  'register',
   loadChildren:  './auth/register/register.module#RegisterPageModule' 
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'kargatzen',
    loadChildren: () => import('./kargatzen/kargatzen.module').then( m => m.KargatzenPageModule)
  },
  {
    path: 'taldea',
    loadChildren: () => import('./taldea/taldea.module').then( m => m.TaldeaPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
