import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApickaService } from '../../services/apicka.service';
import { AuthServiceService } from '../../services/auth.service';
import { ChatService } from '../../services/chat.service';
import { DetailsService } from '../../services/details.service';
import { UserTrackingService } from '../../services/user-tracking.service';
import { Users } from '../../models/users.interface';
import { User } from '../../models/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lavy-panel',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './lavy-panel.component.html',
  styleUrl: './lavy-panel.component.css'
})
export class LavyPanelComponent implements OnInit {
  users: User[] = [];
  currentUser: User | null = null;
  selectedUser: User | null = null;

  constructor(
    private api: ApickaService,
    private auth: AuthServiceService,
    private details: DetailsService,
    private chatService: ChatService,
    private userTracking: UserTrackingService,
    private router: Router
  ) { }

  ngOnInit() {
    // Get logged in user
    this.auth.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    // Get all users
    this.api.currentUsers.subscribe(users => {
      if (users) {
        // Filter out the current user
        this.users = users.users.filter(u =>
          this.currentUser && u.id !== this.currentUser.id
        );
      }
    });

    // Load users from API
    this.api.getDummyUsers();
  }

  selectUser(user: User): void {
    this.userTracking.incrementClicks();
    this.selectedUser = this.selectedUser?.id === user.id ? null : user;
  }

  showDetails(user: User): void {
    this.userTracking.incrementClicks();
    this.details.setCurrentUser(user);
    this.router.navigate(['/details', user.id, `${user.firstName}-${user.lastName}`]);
  }

  startChat(user: User): void {
    this.userTracking.incrementClicks();
    this.chatService.startChat(user);
  }
}
