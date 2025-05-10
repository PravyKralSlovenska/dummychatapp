import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../services/auth.service';
import { UserTrackingService } from '../../services/user-tracking.service';
import { User } from '../../models/user.interface';

@Component({
  selector: 'app-horna-listina',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './horna-listina.component.html',
  styleUrl: './horna-listina.component.css'
})
export class HornaListinaComponent implements OnInit {
  user: User | null = null;
  loginTime: Date | null = null;
  clickCount = 0;
  charCount = 0;
  chatCount = 0;

  constructor(
    private auth: AuthServiceService,
    private userTracking: UserTrackingService
  ) { }

  ngOnInit() {
    this.auth.currentUser$.subscribe(user => {
      this.user = user;
    });

    this.userTracking.loginTime$.subscribe(time => {
      this.loginTime = time;
    });

    this.userTracking.clickCount$.subscribe(count => {
      this.clickCount = count;
    });

    this.userTracking.charCount$.subscribe(count => {
      this.charCount = count;
    });

    this.userTracking.chatCount$.subscribe(count => {
      this.chatCount = count;
    });
  }

  logout() {
    this.auth.logout();
  }

  formatDate(date: Date | null): string {
    if (!date) return '';
    return date.toLocaleString();
  }
}
