import { Component, Input } from '@angular/core';
import { Post } from '../interfaces/post';

@Component({
  selector: 'app-post-list-component',
  imports: [],
  templateUrl: './post-list-component.html',
  styleUrl: './post-list-component.scss',
})
export class PostListComponent {

  @Input({required: true}) posts!: Post[]

}
