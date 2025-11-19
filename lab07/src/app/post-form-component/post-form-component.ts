import { Component, DoCheck } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../services/post-service';
import { PostForm } from '../interfaces/postForm';
import { Post } from '../interfaces/post';

@Component({
  selector: 'app-post-form-component',
  imports: [ReactiveFormsModule],
  templateUrl: './post-form-component.html',
  styleUrl: './post-form-component.scss',
})

export class PostFormComponent implements DoCheck {

  postForm = new FormGroup<PostForm>({
    title: new FormControl<string | null>("", Validators.required),
    body: new FormControl<string | null>("", Validators.required),
  },{
    updateOn: "change"
  });

  protected lastEdited: Post | null = null;

  constructor(protected PostService: PostService){
  }

  ngDoCheck(): void {
    const post = this.PostService.postToEditData;

    if (!post) return
    
    if (post.id != this.lastEdited?.id){

      this.postForm.patchValue({
        title: post.title,
        body: post.body
      })

      this.lastEdited=post
    }

    
  }

  submit(form: FormGroup){
    if (form.invalid) return
  
    if (this.lastEdited){
      const {id, createdAt} = this.lastEdited
      const postEdit = {
        id,
        ...form.value,
        createdAt,
        lastModifiedAt: new Date()
      }

      this.PostService.edit(postEdit);

      this.lastEdited = null;
      
    }
    else{
        const post = {
        ...form.value,
        createdAt: new Date(),
        lastModifiedAt: new Date()
      }
      
      this.PostService.add(post);
    }

    

    // this.postForm.reset();
  }

}
