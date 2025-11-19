import { Component, Input, Output } from '@angular/core';
import { Post } from '../interfaces/post';
import { DatePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { PostService } from '../services/post-service';
import { SortedPostsPipe } from '../pipes/sorted-posts-pipe';

@Component({
  selector: 'app-post-list-component',
  imports: [DatePipe, UpperCasePipe, SortedPostsPipe],
  templateUrl: './post-list-component.html',
  styleUrl: './post-list-component.scss',
})
export class PostListComponent {

  protected posts: Post[] = [];

  constructor(private PostService: PostService){
    this.posts = PostService.getCurrPage();
  }

  remove(id: number){
    this.PostService.remove(id);
  }

  edit(post: Post){
    this.PostService.newPostToEdit = post;
  }

  prevPage(){
    const posts = this.PostService.getPrevPage();
    console.log(posts);
    
    this.posts=posts;
  }
  nextPage(){
    const posts = this.PostService.getNextPage();
    console.log(posts);
    
    this.posts = posts;
  }

}
