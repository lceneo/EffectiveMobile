import { Injectable } from '@angular/core';
import {BehaviorSubject, map, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";

export interface IPost{
  "userId": number,
  "id": number,
  "title": string,
  "body": string
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private _posts$ = new BehaviorSubject<IPost[]>([]);
  constructor(
    private httpClient: HttpClient
  ) {
    const savedPosts = localStorage.getItem('savedPosts');
    if (savedPosts) {
      this._posts$.next(JSON.parse(savedPosts));
    }
  }

  get$() {
    return this._posts$.asObservable();
  }

  get() {
    return [...this._posts$.value];
  }

  upsert$(posts: IPost[]){
    this._posts$.next([...this._posts$.value, ...posts].sort((f, s) => f.id - s.id));
  }

  loadPostsForNewPage$(page: number, postsPerPage: number){
    return this.httpClient.get<IPost[]>(`https://jsonplaceholder.typicode.com/posts?_start=${(page - 1) * 10}&_limit=${postsPerPage}`)
      .pipe(
        map(posts => posts && posts.length ? posts : this.generateNewPosts(10, 255, page, postsPerPage)),
        tap(posts => this.upsert$(posts))
      );
  }

  private generateNewPosts(minLength: number, maxLength: number, page: number, postsNumber: number): IPost[] {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const newPosts: IPost[] = [];
    let lastPostID = Math.max(...this.get().map(p => p.id)) + 1;
    if (!isFinite(lastPostID)) { lastPostID = (page - 1) * 10 + 1 }
    for (let i = 0; i < postsNumber; i++) {
      let postText = '';
      const postLength = Math.floor(Math.random() * (maxLength - minLength));
      for (let i = 0; i < postLength; i++) {
        postText += characters[Math.floor(Math.random() * characters.length)];
      }
      newPosts.push({
        id: lastPostID,
        body: postText,
        title: 'title',
        userId: Math.floor(Math.random() * 100)
      });
      lastPostID++;
    }
    return newPosts;
  }
}
