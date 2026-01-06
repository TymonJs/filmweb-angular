import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FilmService } from '../../services/film.service';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SelectModule } from 'primeng/select';
import { FilmForm } from '../../interfaces/form.interface';
import { DatePickerModule } from 'primeng/datepicker';
import { CollectionService } from '../../services/collection.service';
import { Collection, FilmResponse } from '../../interfaces/film.interface';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem, MessageService } from 'primeng/api';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-film',
  imports: [ReactiveFormsModule, 
    IftaLabelModule, 
    InputTextModule, 
    InputNumberModule, 
    SelectModule, 
    ButtonModule, 
    RouterModule, 
    DatePickerModule,
    BreadcrumbModule
  ],
  templateUrl: './add-film.component.html',
  styleUrl: './add-film.component.scss',
})
export class AddFilmComponent implements OnInit{

  private filmService = inject(FilmService);
  private collectionService = inject(CollectionService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private location = inject(Location);
  private messageService = inject(MessageService);

  protected colFormVisible = false;
  protected collections = signal<Collection[]>([]);
  protected isEditing = this.location.path().endsWith("edit");
  protected filmId!: number;
  protected prevFilm!: FilmResponse;

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

  protected addItems: MenuItem[] = [
    {
      label: "Films",
      routerLink: "/films"
    },
    {
      label: "Add film"
    }
  ]

  protected editItems!: MenuItem[];

  protected home = {
    icon: "pi pi-home",
    routerLink: "/"
  }

  protected get coverUrl(): string {
    const v = this.form.controls.cover.value;
    return typeof v === 'string' && v.trim().length ? v.trim() : '';
  }

  ngOnInit(): void {
    this.collectionService.getCollections().subscribe({
      next: (cols) => this.collections.set(cols),
      error: () => this.router.navigate(["server-error"])
    })

    if (this.isEditing){
      this.route.params.subscribe(params => {
        const id = +params['id'];
        this.filmId = id;

        this.filmService.getFilm(id).subscribe({
          next: (film) => {
            this.prevFilm = film;
            this.form.patchValue({
              title: film.title,
              releaseDate: film.releaseDate,
              length: film.length,
              cover: film.cover,
              collectionId: film.collection.id
            })

            this.editItems = [
              {
                label: "Films",
                routerLink: "/films"
              },
              {
                label: film.title,
                routerLink: `/films/${film.id}`
              },
              { label: "Edit Film" }
            ]
          },
          error: () => this.router.navigate(["not-found"])
        })
      })
    }
  }

  protected submit(edit = false){
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

    if (edit){
      this.filmService.editFilm(this.filmId, payload).subscribe({
        next: (res) => {
          this.router.navigate(['films',res.id]);
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Film has been updated.'});
        },
        error: () => {
          this.form.setErrors({ badRequest: true });
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Failed to update film.'});
        }
      })
    }
    else{
      this.filmService.addFilm(payload).subscribe({
        next: (res) => {
          this.router.navigate(['films',res.id]);
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Film has been added.'});
        },
        error: () => {
          this.form.setErrors({ badRequest: true });
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Failed to add film.'});
        }
      })
    }
  }

  protected get canSubmitEdit(){
    const values = this.form.getRawValue();
 
    return this.form.valid && (
      values.title !== this.prevFilm.title ||
      (new Date(values.releaseDate as string).toISOString().split("T")[0]) !== this.prevFilm.releaseDate ||
      values.length !== this.prevFilm.length ||
      values.cover !== this.prevFilm.cover ||
      values.collectionId !== this.prevFilm.collection.id
    );
  }

  protected addCol(){
    const collection = this.colForm.controls.collection.value;

    if (collection == null || collection === ""){
      this.colForm.controls.collection.setErrors({required: true});
      return;
    }
    const cols = this.collections();

    const collectionFormatted = collection.trim()
    
    if (cols.find(c => c.name.trim().toLowerCase() === collectionFormatted.toLowerCase())){
      this.colForm.controls.collection.setErrors({exists: true});
      return;
    }
    this.collectionService.addCollection(collectionFormatted).subscribe({
      next: (next) => {
        this.collections.set([...cols, next]);
        this.form.controls.collectionId.setValue(next.id);
        this.colFormVisible = false;
        this.colForm.reset();
        this.messageService.add({severity:'success', summary: 'Success', detail: `Collection "${next.name}" has been added.`});

      },
      error: () => {
        this.colForm.controls.collection.setErrors({exists: true})
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Collection already exists.'});
      }
    })
    
  }

}
