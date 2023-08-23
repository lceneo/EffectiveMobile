import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { PostComponent } from './components/post/post.component';
import {RouterModule, Routes} from "@angular/router";
import { GetPostsByPagePipe } from './pipes/get-posts-by-page.pipe';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {NgLetDirective} from "../../shared/directives/ng-let.directive";
import {MatCardModule} from "@angular/material/card";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {getPostResolver} from "../../shared/resolvers";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatTooltipModule} from "@angular/material/tooltip";
import {TranslateModule} from "@ngx-translate/core";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'posts' },
  { path: 'posts', component: PostsListComponent },
  { path: 'posts/:id', component: PostComponent, resolve: {
      post: getPostResolver
    } }
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
    MatIconModule,
    NgLetDirective,
    MatCardModule,
    NgOptimizedImage,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatTooltipModule,
    TranslateModule
  ]
})
export class PostsModule { }
