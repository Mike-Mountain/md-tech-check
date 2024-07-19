import {AfterViewInit, Component, inject, Renderer2, TemplateRef, ViewChild} from '@angular/core';
import {PostsService} from "../../services/posts.service";
import {AsyncPipe, NgIf} from "@angular/common";
import {tap} from "rxjs";
import {MatCard, MatCardContent} from "@angular/material/card";

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    MatCard,
    MatCardContent
  ],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.scss'
})
export class BlogPostComponent {
  @ViewChild('postHeader') postHeader: TemplateRef<HTMLElement> | undefined;
  private postsService = inject(PostsService);

  public selectedPost$ = this.postsService.getSelectedPost();
}
