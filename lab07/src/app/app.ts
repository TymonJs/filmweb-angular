import { Component, signal } from '@angular/core';
import { PostFormComponent } from "./post-form-component/post-form-component";
import { PostListComponent } from "./post-list-component/post-list-component";
import { Post } from './interfaces/post';

@Component({
  selector: 'app-root',
  imports: [PostFormComponent, PostListComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {

  protected posts: Post[] = [];

  
}
