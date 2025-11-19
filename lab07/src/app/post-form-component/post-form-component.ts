import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../services/post-service';
import { PostForm } from '../interfaces/postForm';

@Component({
  selector: 'app-post-form-component',
  imports: [ReactiveFormsModule],
  templateUrl: './post-form-component.html',
  styleUrl: './post-form-component.scss',
})

export class PostFormComponent {

  postForm = new FormGroup<PostForm>({
    title: new FormControl<string | null>("", Validators.required),
    body: new FormControl<string | null>("", Validators.required),
  },{
    updateOn: "change"
  });

  constructor(private PostService: PostService){
  }

  submit(form: FormGroup){
    console.log(form.value);
    
    this.PostService.add(form);
  }

}
