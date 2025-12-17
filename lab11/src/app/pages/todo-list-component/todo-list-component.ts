import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../service/todo-service';
import { TodoDto } from '../../dto/todo.interface';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-todo-list-component',
  imports: [],
  templateUrl: './todo-list-component.html',
  styleUrl: './todo-list-component.scss',
})
export class TodoListComponent implements OnInit{

  protected todos!: TodoDto[];

  constructor(private TodoService: TodoService, private router: Router){}

  ngOnInit(): void {
    this.TodoService.getAll().subscribe(next => {
      this.todos = next;
    })
  }

  add(){
    this.router.navigate(["form"]);
  }
  edit(id: number){
    this.router.navigate(["form",id]);
  }
  remove(id: number){

    this.TodoService.remove(id)
      .pipe(
        switchMap(() => this.TodoService.getAll())
      )
      .subscribe(next => {
        this.todos = next;
      })
  }
}
