import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoForm } from '../../interface/todo.interface';
import { TodoService } from '../../service/todo-service';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoDto } from '../../dto/todo.interface';

@Component({
  selector: 'app-todo-form-component',
  imports: [ReactiveFormsModule],
  templateUrl: './todo-form-component.html',
  styleUrl: './todo-form-component.scss',
})
export class TodoFormComponent implements OnInit{

  protected todo!: TodoDto;

  protected form: FormGroup<TodoForm> = new FormGroup<TodoForm>({
    name: new FormControl("", Validators.required),
    isComplete: new FormControl(false)
  });

  constructor(private TodoService: TodoService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const id = params["id"];

      if (id){
        this.TodoService.getById(id).subscribe(next => {
          this.todo = next;
          this.form.patchValue({name: next.name, isComplete: next.isComplete})
        })
      }

    })
  }

  add(form: FormGroup<TodoForm>){
    if (form.invalid) return;

    const {name, isComplete} = form.value

    if (name==null || isComplete==null) return;

    this.TodoService.add({name, isComplete}).subscribe(next => {
      this.router.navigate(["details",next.id])
    })
  }

  edit(form: FormGroup<TodoForm>){
    
    if (form.invalid) return;
    const {name, isComplete} = form.value

    if (name==null || isComplete==null) return;

    this.TodoService.edit({
      id: this.todo.id,
      name,
      isComplete
    })
    .subscribe({
      next: () => {
        this.router.navigate(["details",this.todo.id])
      },
      error: () => {
        console.log("edit error");
      }
    })

  }

}
