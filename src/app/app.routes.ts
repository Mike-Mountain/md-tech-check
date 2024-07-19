import { Routes } from '@angular/router';
import {BlogPostComponent} from "./blog/components/blog-post/blog-post.component";
import {CreatePostComponent} from "./blog/components/create-post/create-post.component";

export const routes: Routes = [
  {path: '', component: BlogPostComponent},
  {path: 'create', component: CreatePostComponent}
];
