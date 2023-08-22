import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, forkJoin, map, Observable, of, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";

export interface IPost{
  "userId": number,
  "id": number,
  "title": string,
  "body": string,
  "photoURL": string
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

  getID$(id: number) {
    const item = this._posts$.value.find(p => p.id === id);
    return item ? of({...item}) :
      forkJoin([
        this.httpClient.get<{photo: {url: string}}>(`https://api.slingacademy.com/v1/sample-data/photos/${id}`),
        this.httpClient.get<IPost>(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .pipe(
          catchError(err => of(null as unknown as IPost))
        )])
        .pipe(
          map(([photoObj, post]) => (post ? {...post, photoURL: photoObj?.photo?.url} : null))
        )

  }
  getID(id: number) {
    return {...this._posts$.value.find(p => p.id === id)} as IPost;
  }

  upsert$(posts: IPost[]){
    this._posts$.next([...this._posts$.value, ...posts].sort((f, s) => f.id - s.id));
  }

  loadPostsForNewPage$(page: number, postsPerPage: number): Observable<IPost[]>{
    return forkJoin(
      [
        this.httpClient.get<{photos: {url: string}[]}>('https://api.slingacademy.com/v1/sample-data/photos?limit=10'),
        this.httpClient.get<IPost[]>(`https://jsonplaceholder.typicode.com/posts?_start=${(page - 1) * 10}&_limit=${postsPerPage}`)
      .pipe(
        map(posts => posts && posts.length ? posts : this.generateNewPosts(10, 255, page, postsPerPage))
      )])
      .pipe(
        map(([photoObj, posts]) =>
          posts.map((post, i) => ({...post, photoURL: photoObj.photos[i].url}))),
        tap(newPosts => this.upsert$(newPosts))
      )
  }

  private generateNewPosts(minLength: number, maxLength: number, page: number, postsNumber: number):  Omit<IPost, 'photoURL'>[] {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const newPosts: Omit<IPost, 'photoURL'>[] = [];
    let lastPostID = (page - 1) * 10 + 1;
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
