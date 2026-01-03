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
import { Filter, Collection, FilmResponse } from '../../interfaces/film.interface';
import { map, switchMap, distinctUntilChanged, debounceTime } from 'rxjs';
import { CollectionService } from '../../services/collection.service';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-films',
  imports: [
    DataViewModule,
    ButtonModule,
    ProgressSpinnerModule,
    ReactiveFormsModule,
    CheckboxModule,
    SelectModule,
    FloatLabelModule
  ],
  templateUrl: './films.component.html',
  styleUrl: './films.component.scss',
})
export class FilmsComponent implements OnInit {
  protected form = new FormGroup<FilmFilter>({
    query: new FormControl<string | null>(''),
    includeUnreleased: new FormControl<boolean | null>(true),
    collectionId: new FormControl<number | null>(null)
  });

  private filmService = inject(FilmService);
  private collectionService = inject(CollectionService);
  protected router = inject(Router);
  protected route = inject(ActivatedRoute);

  protected films = signal<FilmResponse[]>([]);
  protected collections = signal<Collection[]>([]);

  ngOnInit(): void {
    this.collectionService.getCollections().subscribe(cols => this.collections.set(cols));

    this.route.queryParams.subscribe(params => {
      const query = params["query"];
      const includeUnreleased = params["includeUnreleased"] === "false" ? false : true;
      const collectionId = +params["collectionId"];

      this.form.patchValue({ query, includeUnreleased });

      const cols = this.collections();
      const found = cols.find(c => c.id === collectionId);
      if (found) {
        this.form.controls.collectionId.setValue(found.id);
      }
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
          prev.includeUnreleased === curr.includeUnreleased
        )
      )
      .subscribe(next => {
        const { includeUnreleased, collectionId } = next;
        const params: Partial<Filter> = {
          collectionId: collectionId ?? undefined,
          includeUnreleased: includeUnreleased === false ? false : undefined
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
          includeUnreleased: params['includeUnreleased'] === 'false' ? false : true
        })),
        switchMap(filter => this.filmService.getFilms(filter))
      )
      .subscribe(films => this.films.set(films));
  }

  goToDetails(id: number) {
    this.router.navigate([id], {
      relativeTo: this.route,
      queryParamsHandling: 'merge'
    });
  }

  protected add() {
    this.router.navigate(['films', 'add']);
  }
}
