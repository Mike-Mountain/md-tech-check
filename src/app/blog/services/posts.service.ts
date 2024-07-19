import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, map, tap} from "rxjs";
import {Post, User} from "../models/posts.model";
import {HttpClient} from "@angular/common/http";
import {usernames} from "../data/usernames.data";
import {images} from "../data/images.data";

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private http = inject(HttpClient);

  private readonly baseUrl = 'https://jsonplaceholder.typicode.com';
  private postsSrc = new BehaviorSubject<Post[]>([]);
  private selectedPostSrc = new BehaviorSubject<Post | undefined>(undefined);

  public getAllPosts() {
    return this.postsSrc.asObservable();
  }

  public getAllUsers() {
    return this.postsSrc.asObservable().pipe(
      map(posts => {
        return usernames.map(username => {
          return {
            username,
            posts: posts.filter(post => post.username === username)
          } as User;
        })
      })
    )
  }

  public getSelectedPost() {
    return this.selectedPostSrc.asObservable();
  }

  public setSelectedPost(postId: number) {
    const posts = this.postsSrc.value;
    const selectedPost = posts.find(post => post.id === postId);
    this.selectedPostSrc.next(selectedPost);
  }

  public fetchAllPosts() {
    const url = `${this.baseUrl}/posts`;
    this.http.get<Post[]>(url)
      .pipe(
        map(posts => {
          return posts.map(post => {
            post.username = this.setRandomUsername();
            post.image = this.setRandomImage();
            return post;
          })
        }),
        tap(posts => {
          // TODO: Sort the posts based on DateCreated so that they do not move places in the navigation when updating
          const userPosts = posts.filter(post => post.username === 'Aisha Snow');
          this.selectedPostSrc.next(userPosts[0])
        })
      )
      .subscribe(posts => this.postsSrc.next(posts));
  }

  public updatePost(post: Post) {
    const url = `${this.baseUrl}/posts/${post.id}`;
    this.http.put<Post>(url, post)
      .pipe(
        tap(updatedPost => {
          const posts = this.postsSrc.value.filter(item => item.id !== updatedPost.id);
          posts.push(updatedPost);
          this.postsSrc.next(posts);
        })
      )
      .subscribe((updatedPost: Post) => {
        this.selectedPostSrc.next(updatedPost);
      })
  }

  private setRandomUsername() {
    return usernames[Math.floor(Math.random() * usernames.length)];
  }

  private setRandomImage() {
    return images[Math.floor(Math.random() * images.length)];
  }
}
