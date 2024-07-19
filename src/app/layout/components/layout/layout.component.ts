import {Component, inject} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {NavigationComponent} from "../navigation/navigation.component";
import {PostsService} from "../../../blog/services/posts.service";
import {BlogNavigationComponent} from "../../../blog/components/blog-navigation/blog-navigation.component";
import {BlogPostComponent} from "../../../blog/components/blog-post/blog-post.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    NavigationComponent,
    BlogNavigationComponent,
    BlogPostComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
}
