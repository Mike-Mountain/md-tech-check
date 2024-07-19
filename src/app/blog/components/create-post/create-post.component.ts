import {Component, inject} from '@angular/core';
import {PostsService} from "../../services/posts.service";
import {createPostForm} from "../../utils/post-form.util";
import {map} from "rxjs";
import {AsyncPipe, NgIf} from "@angular/common";
import {
  AbstractControl,
  FormBuilder, FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors, ɵElement, ɵFormGroupValue,
  ɵTypedOrUntyped
} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {Router} from "@angular/router";
import {Post} from "../../models/posts.model";

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    MatButton,
    MatCard,
    MatCardContent,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss'
})
export class CreatePostComponent {
  private postsService = inject(PostsService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  public postForm$ = this.postsService.getAllUsers()
    .pipe(
      map(users => {
        // Normally I would collect the username and userId of the logged-in user.
        const singleUser = users[Math.floor(Math.random() * users.length)];
        return createPostForm(this.formBuilder, singleUser.username, singleUser.id)
      })
    );

  public cancelCreatePost() {
    this.router.navigateByUrl('/').then(() => this.postsService.fetchAllPosts());
  }

  public createPost(postform: FormGroup) {
    const post: Post = {...postform.value};
    this.postsService.createPost(post);
    this.router.navigateByUrl('');
  }
}
