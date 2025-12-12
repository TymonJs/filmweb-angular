import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../../interfaces/book.interface';
import { BookService } from '../../../services/book-service';

@Component({
  selector: 'app-book-details-component',
  imports: [],
  templateUrl: './book-details-component.html',
  styleUrl: './book-details-component.scss',
})
export class BookDetailsComponent implements OnInit{
  book!: Book;

  constructor(
    private route: ActivatedRoute,
    private BookService: BookService,
    // private router: Router
  ){}

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      const found = this.BookService.find(param["id"])

      if (found) this.book = found;
      
      
    })
  }
}
