import { Component, OnInit, signal } from '@angular/core';
import { delay, forkJoin, from, interval, map, merge, of, take, tap, toArray, zip } from 'rxjs';
import { NavbarComponent } from "./navbar-component/navbar-component";
import { UserFormComponent } from "./user-form-component/user-form-component";

interface Child {
  id: number,
  name: string,
  lastname: string
}

interface Adult extends Child {
  job: string,
};

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, UserFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected users!: Child[];
  ngOnInit(): void {
    // this.randomNum().subscribe()

    forkJoin([this.getUser(),this.getChild()])
      .pipe(
        map(([u, c]) => [...u, ...c]),
        tap(res => console.log(res))
      )
    .subscribe((res) => {
      this.users=res;
    })
  }

  randomNum(){
    return interval(5000).pipe(
      take(5),
      map(() => Math.floor(Math.random() * 100) + 1),
      tap((res) => console.log(res)),
      toArray(),
      tap((res) => console.log(res),
    ))
  }

  getUser(){
    const users: Adult[] = [
      {id: 0, name: "a", lastname: "b", job: "c"},
      {id: 1, name: "b", lastname: "c", job: "d"},
      {id: 2, name: "c", lastname: "d", job: "e"},
      {id: 3, name: "d", lastname: "e", job: "f"}
    ] 
    return of(users).pipe(
      delay(Math.floor(Math.random() * 100) + 1),
      tap((res) => console.log(res))
    )
  }

  getChild(){
    const users: Child[] = [
      {id: 4, name: "a", lastname: "b"},
      {id: 5, name: "b", lastname: "c"},
      {id: 6, name: "c", lastname: "d"},
      {id: 7, name: "d", lastname: "e"}
    ] 
    return of(users).pipe(
      delay(Math.floor(Math.random() * 100) + 1),
      tap((res) => console.log(res))
    )
  }


}
