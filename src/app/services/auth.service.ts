import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private router: Router) { }

  login(meno: string, priezvisko: string): boolean {
    if (meno && priezvisko) {
      localStorage.setItem("prihlasenyUser", JSON.stringify({}))
      return true
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem("prihlasenyUser");
    this.router.navigate(["/login"])
  }
}
