import { Injectable } from '@angular/core';
import { Book } from '../interfaces/book.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  
  books$ = new BehaviorSubject<Book[]>([]);
  editingBook$ = new BehaviorSubject<Book | null>(null);

  constructor(){
    const saved = localStorage.getItem("books");
    if (saved){
      this.books$.next(JSON.parse(saved))
    }
  }

  save(){
    localStorage.setItem("books", JSON.stringify(this.books$.value))
  }

  add(book: Omit<Book, "id">){
    console.log(book);
    
    const len = this.get().length;
    const lastId = this.get()[len-1]?.id || 0;

    this.books$.next([
      ...this.get(),
      {
        ...book,
        id: lastId + 1,
      }
    ])
    this.save();
  }

  get(){
    return this.books$.value;
  }

  remove(id: number){
    this.books$.next(this.get().filter(c => c.id!==id))
    this.save()
  }
  
  find(id: number){
    return this.get().find(c => c.id === +id);
  }

  edit(book: Book){
    console.log(book);
    
    this.books$.next(this.get().map(c => {
      console.log(c,book);
      
      if (c.id === book.id) return book
      return c
    }))

    this.save()
  }
}
