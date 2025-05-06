import { Component, Input } from '@angular/core';
import { User } from '../../models/user.interface';
import { CommonModule } from '@angular/common';
import { DetailsService } from '../../services/details.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  @Input() User: User | null = null;
  visibility: boolean = false;
  
  constructor (private router: Router, private details: DetailsService) { }
  
  changeVisibility(): void {
    this.router.navigate(["/list-of-messages", this.User?.id, `${this.User?.firstName}-${this.User?.lastName}`]);
    this.visibility = !this.visibility;
  }

  setDetailsUser(): void {
    this.router.navigate(["/details",  this.User?.id, `${this.User?.firstName}-${this.User?.lastName}`]);
    this.details.setCurrentUser(this.User);
  }

  openChat(): void {
    this.router.navigate([]);
  }
}
