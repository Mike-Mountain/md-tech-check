import {AfterViewInit, Component, inject, Renderer2, TemplateRef, ViewChild} from '@angular/core';
import {PostsService} from "../../services/posts.service";
import {AsyncPipe, JsonPipe, NgIf} from "@angular/common";
import {take, tap} from "rxjs";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {Post} from "../../models/posts.model";
import {createIndividualFields} from "../../utils/post-form.util";
import {AbstractControl, FormControl, ReactiveFormsModule} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {InfoDialogComponent} from "../info-dialog/info-dialog.component";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    MatCard,
    MatCardContent,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    JsonPipe,
    MatIcon
  ],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.scss'
})
export class BlogPostComponent {
  private postsService = inject(PostsService);
  private dialog = inject(MatDialog);

  public selectedPost$ = this.postsService.getSelectedPost()
    .pipe(tap(() => {
      // Reset the form controls when the user selects a different post
      this.isEditing = false;
      this.controls = undefined;
    }));

  public isEditing = false;
  public controls?: { title: FormControl, body: FormControl };

  setIsEditing(postDetails: Post) {
    this.isEditing = true;
    this.controls = createIndividualFields(postDetails.title, postDetails.body);
  }

  updatePost(post: Post) {
    if (this.controls) {
      const updatedPost: Post = {
        ...post,
        body: this.controls.body.value,
        title: this.controls.title.value
      }
      this.postsService.updatePost(updatedPost);
    }
  }

  openConfirmDialog(postId: number) {
    const data = {
      body: 'Are you sure you want to delete this post?'
    }
    this.dialog.open(InfoDialogComponent, {data})
      .afterClosed()
      .pipe(take(1))
      .subscribe((confirmed?: boolean) => {
        if (confirmed) {
          this.deletePost(postId);
        }
      });
  }

  deletePost(postId: number) {
    this.postsService.deletePost(postId);
  }
}
