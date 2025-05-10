import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { User } from '../models/user.interface';
import { Users } from '../models/users.interface';
import { UserTrackingService } from './user-tracking.service';
import { ChatService } from './chat.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private readonly USERS_API = 'https://dummyjson.com/users';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private router: Router,
    private http: HttpClient,
    private userTracking: UserTrackingService,
    private chatService: ChatService
  ) {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('prihlasenyUser');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        this.currentUserSubject.next(user);
        this.chatService.setLoggedInUser(user);
      } catch (e) {
        this.logout();
      }
    }
  }

  async login(meno: string, priezvisko: string): Promise<boolean> {
    try {
      // Fetch users from API
      const response = await firstValueFrom(this.http.get<Users>(this.USERS_API));

      // Find user with matching first and last name
      const user = response.users.find(
        u => u.firstName.toLowerCase() === meno.toLowerCase() &&
          u.lastName.toLowerCase() === priezvisko.toLowerCase()
      );

      if (user) {
        // Set login time
        this.userTracking.setLoginTime(new Date());

        // Save user in localStorage and service
        localStorage.setItem('prihlasenyUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.chatService.setLoggedInUser(user);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }

  logout(): void {
    // Show session summary
    const sessionDuration = this.userTracking.getSessionDuration();
    const responseChars = this.userTracking.responseCharCount$;

    // Create alert with session info
    const user = this.currentUserSubject.value;
    if (user) {
      alert(`Logout Summary\n--------------\nSession Duration: ${sessionDuration}\nTotal Response Characters: ${responseChars}`);
    }

    // Reset tracking
    this.userTracking.reset();

    // Clear chat service
    this.chatService.endChat();

    // Clear stored user
    localStorage.removeItem('prihlasenyUser');
    this.currentUserSubject.next(null);

    // Navigate to login page
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
