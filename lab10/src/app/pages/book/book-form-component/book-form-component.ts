import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BookForm } from '../../../interfaces/book.interface';
import { BookService } from '../../../services/book-service';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-book-form-component',
  imports: [ReactiveFormsModule],
  templateUrl: './book-form-component.html',
  styleUrl: './book-form-component.scss',
})
export class BookFormComponent implements OnInit{
  protected form: FormGroup<BookForm> = new FormGroup({
    author: new FormControl(""),
    title: new FormControl("")
  })

  protected editingId: number|null = null;

  constructor(
    private BookService: BookService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const found = this.BookService.find(params["id"])

      if (!found){
        this.editingId = null
        return;
      }

      this.editingId = params["id"];

      this.form.patchValue({
        author: found.author,
        title: found.title
      })
    })
  }

  submit(form: FormGroup){
    if (form.invalid) return;
    this.BookService.add(form.value);
    this.form.reset();
  }

  edit(editingId: number, form: FormGroup){
    if (form.invalid) return;
    this.BookService.edit({id: +editingId, ...form.value});
    this.form.reset()
  }
}
