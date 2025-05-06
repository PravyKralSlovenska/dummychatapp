import { Component } from '@angular/core';
import { AuthServiceService } from '../../services/auth.service';
import { User } from '../../models/user.interface';

@Component({
  selector: 'app-horna-listina',
  imports: [],
  templateUrl: './horna-listina.component.html',
  styleUrl: './horna-listina.component.css'
})
export class HornaListinaComponent {
  user: User;
  
  constructor(private auth: AuthServiceService) {
    this.user = JSON.parse(localStorage.getItem("prihlasenyUser")!);
  }

  logout() {
    this.auth.logout();
  }
}
