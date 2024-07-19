import {Component, EventEmitter, inject, Output} from '@angular/core';
import {PostsService} from "../../services/posts.service";
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription, MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {AsyncPipe, NgIf} from "@angular/common";
import {map} from "rxjs";
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {Router} from "@angular/router";

@Component({
  selector: 'app-blog-navigation',
  standalone: true,
  imports: [
    MatAccordion,
    NgIf,
    AsyncPipe,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatFabButton,
    MatIcon
  ],
  templateUrl: './blog-navigation.component.html',
  styleUrl: './blog-navigation.component.scss'
})
export class BlogNavigationComponent {
  @Output() closeSidebar = new EventEmitter();

  private postsService = inject(PostsService);
  private router = inject(Router);

  public users$ = this.postsService.getAllUsers();
  public selectedPostId$ = this.postsService.getSelectedPost().pipe(map(post => post?.id));

  constructor() {
    this.postsService.fetchAllPosts();
  }

  public selectPost(postId: number) {
    this.postsService.setSelectedPost(postId);
    this.closeSidebar.emit();
  }
}
