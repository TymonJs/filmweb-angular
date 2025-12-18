import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../../service/todo-service';
import { TodoDto } from '../../dto/todo.interface';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-todo-details-component',
  imports: [],
  templateUrl: './todo-details-component.html',
  styleUrl: './todo-details-component.scss',
})
export class TodoDetailsComponent implements OnInit{

  protected todo!: TodoDto;

  constructor(private route: ActivatedRoute, private TodoService: TodoService, private router: Router){}

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      const id = param["id"];

      if (id){
        this.TodoService.getById(id)
          .subscribe(next => {
            this.todo = next;
          })
      }
    })
  }

  edit(){
    this.router.navigate(["form",this.todo.id])
  }

  remove(){
    this.TodoService.remove(this.todo.id).subscribe({
      next: () => {
        this.router.navigate(["list"]);
      },
      error: () => {
        console.log("error");
      }
    })
  }
}
