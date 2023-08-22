import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";
import {PostsService} from "../modules/posts/services/posts.service";

export const getPostResolver = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const id = +route.params['id'];
  const postsS = inject(PostsService);
  return postsS.getID$(id);
}
