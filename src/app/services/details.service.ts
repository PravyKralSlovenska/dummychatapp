import { Injectable } from '@angular/core';
import { User } from '../models/user.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser = this.currentUserSubject.asObservable();
  
  constructor() { }

  setCurrentUser(user: User | null) {
    this.currentUserSubject.next(user);
  }
}
