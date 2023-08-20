import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'authorization'},
  { path: 'authorization', loadChildren: () => import('./modules/authorization/authorization.module').then(f => f.AuthorizationModule) },
  { path: 'main', loadChildren: () => import('./modules/posts/posts.module').then(f => f.PostsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
