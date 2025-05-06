import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable } from 'rxjs';
import { Users } from '../models/users.interface';
import { Gender } from '../models/gender.interface';
import { User } from '../models/user.interface';
import { Zippo } from '../models/zippo.interface';

@Injectable({
  providedIn: 'root'
})
export class ApickaService {
  private readonly dummyURL = "https://dummyjson.com/users";
  private readonly genderURL = "https://api.genderize.io";
  private readonly zippoURL = "https://api.zippopotam.us/us/";
  private readonly postURL = "";

  constructor(private http: HttpClient) { }

  private UserSubject = new BehaviorSubject<Users | null>(null);
  public currentUsers = this.UserSubject.asObservable();

  getDummyUsers(): void {
    this.http.get<Users>(this.dummyURL).subscribe(users => {
      this.UserSubject.next(users);
    });
  }

  getDummyUserByID(id: string): Observable<User> {
    return this.http.get<User>(`${this.dummyURL}/${id}`);
  }

  getDummyUserByName(meno: string, priezvisko: string) {
    // setInterval(() => {
    //   console.log("serus")
    // }, 60);

    // setTimeout(200);
  }

  getGender(name: string): Observable<Gender> {
    return this.http.get<Gender>(`${this.genderURL}?name=${name}`);
  }

  getZippo(postalCode: string): Observable<Zippo> {
    return this.http.get<Zippo>(`${this.zippoURL}/${postalCode}`);
  }
}
