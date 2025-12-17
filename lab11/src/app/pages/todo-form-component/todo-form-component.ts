import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TodoForm } from '../../interface/todo.interface';

@Component({
  selector: 'app-todo-form-component',
  imports: [],
  templateUrl: './todo-form-component.html',
  styleUrl: './todo-form-component.scss',
})
export class TodoFormComponent {

  protected form: FormGroup<TodoForm> = new FormGroup({
    name: new FormControl(""),
    isComplete: new FormControl(false)
  });
}
