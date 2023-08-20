import { Pipe, PipeTransform } from '@angular/core';
import {IPost, PostsService} from "../services/posts.service";
import {Observable, of} from "rxjs";

@Pipe({
  name: 'getPostsByPage'
})
export class GetPostsByPagePipe implements PipeTransform {

  constructor(
    private postsS: PostsService
  ) {
  }
  transform(posts: IPost[] | null, page: number, postsPerPage: number): Observable<IPost[]> {
    console.log(15)
    if (posts) {
      const firstPostIndex = posts.findIndex(p => p.id === (page - 1) * postsPerPage + 1);
      return firstPostIndex >= 0 ? of(posts.slice(firstPostIndex, firstPostIndex + postsPerPage)) : this.postsS.loadPostsForNewPage$(page, postsPerPage);
    } else {
      return of([]);
    }
  }
}
