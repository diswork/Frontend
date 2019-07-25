import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UsuarioGuard } from './guards/usuario.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login-register/login.module#LoginPageModule' },
  { 
    path: 'tabs-user', 
    loadChildren: './pages/tabs-user/tabs-user.module#TabsUserPageModule',
    canLoad : [UsuarioGuard]
  },
  { path: 'tabs-user/tabs-user/tab-user3', loadChildren: './pages/tab-user3/tab-user3.module#TabUser3PageModule' },
  { path: 'cvs', loadChildren: './pages/cvs/cvs.module#CVsPageModule' },

  { 
    path: 'tabs-empresa', 
    loadChildren: './pages/tabs-empresa/tabs-empresa.module#TabsEmpresaPageModule',
    canLoad : [UsuarioGuard]
  },
  { path: 'tabs-empresa/tabs-empresa/tab-empresa3', loadChildren: './pages/tab-empresa3/tab-empresa3.module#TabEmpresa3PageModule' },

  
  { 
    path: 'tabs-admin',
    loadChildren: './pages/tabs-admin/tabs-admin.module#TabsAdminPageModule' },
  { path: 'tabs-admin/tabs-admin/tab-admin4', loadChildren: './pages/tab-admin4/tab-admin4.module#TabAdmin4PageModule' },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
