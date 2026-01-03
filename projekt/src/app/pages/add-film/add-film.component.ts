import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FilmService } from '../../services/film.service';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { SelectModule } from 'primeng/select';
import { FilmForm } from '../../interfaces/form.interface';
import { DatePickerModule } from 'primeng/datepicker';
import { CollectionService } from '../../services/collection.service';
import { Collection } from '../../interfaces/film.interface';

@Component({
  selector: 'app-add-film',
  imports: [ReactiveFormsModule, 
    IftaLabelModule, 
    InputTextModule, 
    InputNumberModule, 
    SelectModule, 
    ButtonModule, 
    RouterModule, 
    DatePickerModule
  ],
  templateUrl: './add-film.component.html',
  styleUrl: './add-film.component.scss',
})
export class AddFilmComponent implements OnInit{

  private filmService = inject(FilmService);
  private collectionService = inject(CollectionService);
  private router = inject(Router);
  protected colFormVisible = false;
  protected collections = signal<Collection[]>([]);

  protected form = new FormGroup<FilmForm>({
    title: new FormControl<string | null>('', [Validators.required, Validators.minLength(1)]),
    releaseDate: new FormControl<string | null>(null, [Validators.required]),
    length: new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
    cover: new FormControl<string | null>('', [Validators.required]),
    collectionId: new FormControl<number | null>(null, [Validators.required])
  })

  protected colForm = new FormGroup<{collection: FormControl<string | null>}>({
    collection: new FormControl<string | null>(null, Validators.required)
  })

  protected get coverUrl(): string {
    const v = this.form.controls.cover.value;
    return typeof v === 'string' && v.trim().length ? v.trim() : '';
  }

  ngOnInit(): void {
    this.collectionService.getCollections().subscribe({
      next: (cols) => this.collections.set(cols),
      error: () => this.router.navigate(["server-error"])
    })
  }

  protected add(){
    if (this.form.invalid) {
      return;
    }

    const values = this.form.getRawValue();
    const releaseDate = new Date(values.releaseDate as string).toISOString().split("T")[0];

    const payload = {
      title: values.title as string,
      releaseDate,
      length: values.length as number,
      cover: values.cover as string,
      collectionId: values.collectionId as number
    }

    this.filmService.addFilm(payload).subscribe({
      next: (res) => this.router.navigate(['films',res.id]),
      error: () => this.form.setErrors({ badRequest: true })
    })
  }

  protected addCol(){
    const collection = this.colForm.controls.collection.value;

    if (collection == null || collection === ""){
      this.colForm.controls.collection.setErrors({required: true});
      return;
    }
    const cols = this.collections();

    const collectionFormatted = collection.trim().toLowerCase();
    
    if (cols.find(c => c.name.trim().toLowerCase() === collectionFormatted)){
      this.colForm.controls.collection.setErrors({exists: true});
      return;
    }
    this.collectionService.addCollection(collectionFormatted).subscribe({
      next: (next) => {
        this.collections.set([...cols, next]);
        this.form.controls.collectionId.setValue(next.id);
        this.colFormVisible = false;
        this.colForm.reset();

      },
      error: () => {this.colForm.controls.collection.setErrors({exists: true})}
    })
    
  }

}
