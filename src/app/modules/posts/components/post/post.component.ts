import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {map, Observable, switchMap} from "rxjs";
import {IPost, PostsService} from "../../services/posts.service";
import {PreviousRouteService} from "../../../../shared/services/previous-route.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent{
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postS: PostsService,
    private previousRouteS: PreviousRouteService
  ) {}

  protected post$: Observable<IPost | null> = this.route.data.pipe(
    map(data => data['post'])
  );

  returnToListPage() {
    const listPageUrl = this.previousRouteS.getPreviousRoute();
    let page;
    if (listPageUrl) {
      const pageRegExp = /page=(\d+)/.exec(listPageUrl);
      page = pageRegExp ? +pageRegExp[1] : 1;
    }
    this.router.navigate(['../'], {relativeTo: this.route, queryParams: {page: page}});
  }
}
