import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Post } from '../interfaces/post';
import { PostForm } from '../interfaces/postForm';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  
  private posts: Post[] = [];

  public add(form: FormGroup<PostForm>){
    const title = form.controls.title.value as string
    const body = form.controls.body.value as string
    const createdAt = new Date();
    const lastModifiedAt = new Date();

    const postsLength = this.posts.length 
    const id = postsLength===0? 1 :this.posts[postsLength-1].id+1

    const newPost: Post = {id,title,body,createdAt,lastModifiedAt};

    this.posts.push(newPost);
  }
  public remove(id: number){
    this.posts = this.posts.reduce((acc: Post[],c: Post) => {
      if (c.id === id) return acc
      return [...acc, c]
    },[])
  }

  public edit(post: Post){
    this.posts = this.posts.reduce((acc: Post[],c: Post) => {
      if (c.id === post.id) return [...acc, post]
      return [...acc, c]
    },[])
  }
} 
