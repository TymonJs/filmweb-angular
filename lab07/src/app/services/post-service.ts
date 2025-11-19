import { Injectable } from '@angular/core';
import { Post } from '../interfaces/post';


@Injectable({
  providedIn: 'root',
})
export class PostService{
  
  private posts: Post[] = [];
  private postToEdit: Post | null = null;
  private currPage: number = 1;
  private postsPerPage = 3;

  constructor(){
    const savedPosts = localStorage.getItem("posts");
    if (savedPosts){
      this.posts = JSON.parse(savedPosts);
    }
    
  }

  save(){
    localStorage.setItem("posts", JSON.stringify(this.posts));
  }

  public add(post: Omit<Post, "id">){
    const postsLength = this.posts.length ;
    const id = postsLength===0? 1 :this.posts[postsLength-1].id+1;

    const newPost: Post = {id, ...post};

    this.posts.push(newPost);

    this.save();
  }

  public remove(id: number){
    this.posts = this.posts.filter(c => c.id!==id);

    this.save();
  }

  public edit(post: Post){
    this.postToEdit = null;
    this.posts = this.posts.reduce((acc: Post[],c: Post) => {
      if (c.id === post.id) return [...acc, post];
      return [...acc, c];
    },[])

    this.save();
  }

  get allPosts(){
    return this.posts;
  }

  getCurrPage(){
    const start = (this.currPage-1)*this.postsPerPage;
    const end = this.postsPerPage + start;
    return this.posts.slice(start, end);

  }
  public getNextPage(){
    if (Math.ceil(this.posts.length / this.postsPerPage) > this.currPage) this.currPage+=1
    return this.getCurrPage();
  }
  public getPrevPage(){
    if (this.currPage>1) this.currPage-=1;
    return this.getCurrPage();
  }

  get postToEditData(){
    return this.postToEdit;
  }
  set newPostToEdit(post: Post){
    this.postToEdit = post;
  }
} 
