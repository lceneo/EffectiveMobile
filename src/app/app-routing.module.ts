import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {authGuard} from "./shared/guards";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'authorization'},
  { path: 'authorization', loadChildren: () => import('./modules/authorization/authorization.module').then(f => f.AuthorizationModule),
    canActivate: [authGuard], canActivateChild: [authGuard] },
  { path: 'main', loadChildren: () => import('./modules/posts/posts.module').then(f => f.PostsModule), canActivate: [authGuard], canActivateChild: [authGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
