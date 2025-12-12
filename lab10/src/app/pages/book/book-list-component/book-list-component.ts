import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../services/book-service';
import { Book } from '../../../interfaces/book.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list-component',
  imports: [],
  templateUrl: './book-list-component.html',
  styleUrl: './book-list-component.scss',
})
export class BookListComponent implements OnInit{

  protected books!: Book[];

  constructor(
    private BookService: BookService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.BookService.books$.subscribe(next => {
      this.books=next;
    })
  }

  view(id: number){
    this.router.navigate(["book",id,"details"])
  }

  edit(id: number){
    this.router.navigate(["book",id,"form"])
  }

  remove(id: number){
    this.BookService.remove(id);
  }
}
