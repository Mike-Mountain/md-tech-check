import {AfterViewInit, Component, inject, Renderer2, TemplateRef, ViewChild} from '@angular/core';
import {PostsService} from "../../services/posts.service";
import {AsyncPipe, NgIf} from "@angular/common";
import {tap} from "rxjs";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {Post} from "../../models/posts.model";
import {createIndividualFields} from "../../utils/post-form.util";
import {AbstractControl, FormControl, ReactiveFormsModule} from "@angular/forms";

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
    ReactiveFormsModule
  ],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.scss'
})
export class BlogPostComponent {
  @ViewChild('postHeader') postHeader: TemplateRef<HTMLElement> | undefined;
  private postsService = inject(PostsService);

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
}
