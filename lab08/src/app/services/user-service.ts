import { Injectable, OnDestroy } from '@angular/core';
import { User } from '../interfaces/user';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public users$ = new BehaviorSubject<User[]>([]);
  public editingUser$ = new BehaviorSubject<User | null>(null);
  constructor(){
    const saved = localStorage.getItem("users")
    if (saved){
      this.users$.next(JSON.parse(saved));
    }
  }

  save(): void {
    localStorage.setItem("users", JSON.stringify(this.users$.value))
  }

  addUser(user: Omit<User,"id">){

    const len = this.users$.value.length;
    const lastId = this.users$.value[len-1]?.id || 0;

    this.users$.value.push({
      ...user,
      id: lastId+1
    })

    this.save();
  }

  removeUser(id: number){
    
    this.users$.next(this.users$.value.filter(c => c.id!==id));
    this.save();
  }

  removeAddress(id: number, i: number){

    const updated = this.users$.value.map(c => {
      if (c.id===id){
        
        return {
          ...c,
          addresses : c.addresses.filter((a,aId) => aId!==i)
        }
      }

      return c
    })
    this.users$.next(updated)
    this.save();
  }

  editUser(id: number){
    const found = this.users$.value.find(c => c.id===id);
    if (found){
      this.editingUser$.next(found)
    }
  }

  updateUser(user: Omit<User, "id">){
    
    this.users$.next(
      this.users$.value.map(c => {
        
        if (c.id === this.editingUser$.value?.id) return {...user, id: this.editingUser$.value?.id }
        return c
      })
    )

    this.editingUser$.next(null)
    this.save();
  }



}
