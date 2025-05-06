import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../../models/users.interface';
import { UserComponent } from '../user/user.component';
import { ApickaService } from '../../services/apicka.service';

@Component({
  selector: 'app-lavy-panel',
  imports: [CommonModule, UserComponent],
  templateUrl: './lavy-panel.component.html',
  styleUrl: './lavy-panel.component.css'
})
export class LavyPanelComponent {
  currentUsers: Users | null = null;

  constructor (private api: ApickaService) {
    this.api.currentUsers.subscribe(users => {
      this.currentUsers = users;
    });

    console.log(this.currentUsers);
  }
}
