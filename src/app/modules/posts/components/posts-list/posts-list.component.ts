import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {IPost, PostsService} from "../../services/posts.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsListComponent{
  constructor(
    private postsS: PostsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.router.routerState.root.queryParams.subscribe(params => {
      this.currentPage = params['page'] ? + params['page'] : 1;
    })
  }

  protected posts$ = this.postsS.get$() as Observable<IPost[]>;
  protected currentPage: number = 1;
  protected readonly postsPerPage = 10;


  protected changePage(newPage: number) {
    this.router.navigate([], {
      queryParams: {page: newPage},
      relativeTo: this.router.routerState.root
    })
  }
}
