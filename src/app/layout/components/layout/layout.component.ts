import {Component, inject} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {NavigationComponent} from "../navigation/navigation.component";
import {PostsService} from "../../../blog/services/posts.service";
import {BlogNavigationComponent} from "../../../blog/components/blog-navigation/blog-navigation.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    NavigationComponent,
    BlogNavigationComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
}
