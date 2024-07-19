import {Component, inject} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {NavigationComponent} from "../navigation/navigation.component";
import {PostsService} from "../../../blog/services/posts.service";
import {BlogNavigationComponent} from "../../../blog/components/blog-navigation/blog-navigation.component";
import {BlogPostComponent} from "../../../blog/components/blog-post/blog-post.component";
import {map, Observable, shareReplay} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

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
  private breakpointObserver = inject(BreakpointObserver);

  public isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
}
