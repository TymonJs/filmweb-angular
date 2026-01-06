import { Component, inject, OnInit, signal } from '@angular/core';
import { FilmService } from '../../services/film.service';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { FilmFilter } from '../../interfaces/form.interface';
import { SelectModule } from 'primeng/select';
import { Filter, Collection, FilmResponse, Sort } from '../../interfaces/film.interface';
import { map, switchMap, distinctUntilChanged, debounceTime } from 'rxjs';
import { CollectionService } from '../../services/collection.service';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IftaLabelModule } from 'primeng/iftalabel';
import { AccordionModule } from 'primeng/accordion';
import { ScrollerModule } from 'primeng/scroller';
import { ImageModule } from 'primeng/image';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-films',
  imports: [
    DataViewModule,
    ButtonModule,
    ProgressSpinnerModule,
    ReactiveFormsModule,
    CheckboxModule,
    SelectModule,
    FloatLabelModule,
    IftaLabelModule,
    AccordionModule,
    ScrollerModule,
    ImageModule
  ],
  templateUrl: './films.component.html',
  styleUrl: './films.component.scss',
})
export class FilmsComponent implements OnInit {

  protected form = new FormGroup<FilmFilter>({
    query: new FormControl<string | null>(''),
    includeUnreleased: new FormControl<boolean | null>(true),
    collectionId: new FormControl<number | null>(null),
    sort: new FormControl<Sort | null>(null)
  });

  private filmService = inject(FilmService);
  private collectionService = inject(CollectionService);
  protected router = inject(Router);
  protected route = inject(ActivatedRoute);
  private messageService = inject(MessageService);

  protected films = signal<FilmResponse[]>([]);
  protected collections = signal<Collection[]>([]);
  protected film = signal<FilmResponse | null>(null);

  ngOnInit(): void {
    
    this.collectionService.getCollections().subscribe(cols => {
      this.collections.set(cols)
      const params = this.route.snapshot.queryParams;

      this.form.patchValue({
        query: params['query'] ?? '',
        includeUnreleased: params['includeUnreleased'] === 'false' ? false : true,
        collectionId: params['collectionId'] ? +params['collectionId'] : null,
        sort: params["sort"] ?? null
      });

    });

    this.form.controls.query.valueChanges
      .pipe(debounceTime(300))
      .subscribe(query => {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { query: query && query.length ? query : null },
          queryParamsHandling: 'merge'
      });
    });

    this.form.valueChanges
      .pipe(
        distinctUntilChanged((prev, curr) =>
          prev.collectionId === curr.collectionId &&
          prev.includeUnreleased === curr.includeUnreleased &&
          prev.sort === curr.sort
        )
      )
      .subscribe(next => {
        const { includeUnreleased, collectionId, sort } = next;
        const params: Partial<Filter> = {
          collectionId: collectionId ?? undefined,
          includeUnreleased: includeUnreleased === false ? false : undefined,
          sort: sort ?? undefined
        };
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: params,
          queryParamsHandling: 'merge'
        });
      });

    this.route.queryParams
      .pipe(
        map(params => ({
          query: params['query'],
          collectionId: params['collectionId'],
          includeUnreleased: params['includeUnreleased'] === 'false' ? false : true,
          sort: params["sort"]
        })),
        switchMap(filter => this.filmService.getFilms(filter))
      )
      .subscribe(films => this.films.set(films));

      this.route.params.subscribe(params => {
          const id = +params["id"];
          
          if (id && id > 0){
            this.filmService.getFilm(id).subscribe({
              next: (res) => {
                this.film.set(res);
              },
              error: () => this.router.navigate(["server-error"])
            })
          }
        })
  }


  // get showFilms(){
  //   const values = this.form.value;
  //   return this.form.dirty || 
  //     this.form.touched || 
  //     values.query!=="" || 
  //     values.collectionId !== null || 
  //     values.includeUnreleased===false
  //     || values.sort!==null;
  // }

  goToDetails(id: number) {
    this.router.navigate(["films",id], {
      queryParamsHandling: 'merge'
    });
  }

  protected add() {
    this.router.navigate(['films', 'add']);
  }

  protected remove(){
    this.filmService.removeFilm(this.film()?.id as number).subscribe({
      next: () => {
        this.router.navigate(['films']);
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Film has been removed.'});
      },
      error: () => {
        this.router.navigate(['server-error']);
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Failed to remove film.'});
      }
    });
  }

  protected edit(){
    this.router.navigate(['films', this.film()?.id, 'edit'])
    
  }
}
