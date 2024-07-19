import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Post} from "../models/posts.model";
import {inject} from "@angular/core";
import {setRandomImage} from "./data.util";

export function createIndividualFields(title: string, body: string) {
  return {
    title: new FormControl(title),
    body: new FormControl(body)
  }
}

export function createPostForm(formBuilder: FormBuilder, username: string, userId: number) {
  return formBuilder.group({
    title: ['', Validators.required],
    body: ['', Validators.required],
    image: [setRandomImage()],
    userId: [userId],
    username: [username]
  })
}

export function createEmptyPost() {
  return {
    id: 0,
    userId: 0,
    username: '',
    image: '',
    title: '',
    body: '',
  } as Post
}
