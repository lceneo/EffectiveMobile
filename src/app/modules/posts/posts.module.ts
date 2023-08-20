import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { PostComponent } from './components/post/post.component';
import {RouterModule, Routes} from "@angular/router";
import { GetPostsByPagePipe } from './pipes/get-posts-by-page.pipe';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'posts'},
  { path: 'posts', component: PostsListComponent},
  { path: 'post:id', component: PostComponent}
];
@NgModule({
  declarations: [
    PostsListComponent,
    PostComponent,
    GetPostsByPagePipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatIconModule
  ]
})
export class PostsModule { }
