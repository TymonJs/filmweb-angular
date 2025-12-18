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
  protected page = 1;
  protected maxPage: number = Infinity;

  constructor(private TodoService: TodoService, private router: Router){}

  ngOnInit(): void {
    this.TodoService.getPage(this.page).subscribe(next => {
      this.todos = next.data;
    })
  }

  add(){
    this.router.navigate(["form"]);
  }
  edit(id: string){
    this.router.navigate(["form",id]);
  }
  remove(id: string){

    this.TodoService.remove(id)
      .pipe(
        switchMap(() => this.TodoService.getAll())
      )
      .subscribe(next => {
        this.todos = next;
      })
  }
  nextPage(){
    this.TodoService.getPage(this.page+1)
      .subscribe({
        next: (page) => {
          this.page+=1;
          this.maxPage = page.last;
          this.todos = page.data;
        },
        error: (err) => {
          console.log(err);
          
        }
      })
  }

  prevPage(){
    this.TodoService.getPage(this.page-1)
      .subscribe({
        next: (page) => {
          this.page-=1;
          this.todos = page.data;
        },
        error: (err) => {
          console.log(err);
          
        }
      })
  }
}
