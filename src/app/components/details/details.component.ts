import { Component } from '@angular/core';
import { DetailsService } from '../../services/details.service';
import { User } from '../../models/user.interface';
import { CommonModule } from '@angular/common';
import { ApickaService } from '../../services/apicka.service';

@Component({
  selector: 'app-details',
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  public user: User | null = null;

  constructor(private details: DetailsService, private api: ApickaService) { }
  
  ngOnInit(): void {
    this.details.currentUser.subscribe(async user => {
      // too many requests dopice
      if (user) {
        await this.api.getGender(user.firstName).subscribe(json => {
          user.testPohlavie = json.gender;
        });

        await this.api.getZippo(user.address.postalCode).subscribe(json => {
          user.testAdresa = json;
        });

        this.user = user;
      }    
    });
  }
}
