import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApickaService } from '../../services/apicka.service';

@Component({
  selector: 'app-messages-list',
  imports: [],
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css'
})
export class MessagesListComponent {
  userMessages: string[] | Object | null = [];

  constructor(private route: ActivatedRoute, private api: ApickaService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.loadUser(params.get("id")!);      
    });
  }

  loadUser(id: string): void {
    this.api.getDummyUserByID(id).subscribe(user => {
      console.log(user);
    });
  }
}
