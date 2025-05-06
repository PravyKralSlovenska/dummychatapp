import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApickaService } from './services/apicka.service';
import { HornaListinaComponent } from "./components/horna-listina/horna-listina.component";
import { LavyPanelComponent } from "./components/lavy-panel/lavy-panel.component";
import { PravyPanelComponent } from "./components/pravy-panel/pravy-panel.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'koncorocny-projekt-2025';

  constructor(private api: ApickaService) {
    this.api.getDummyUsers();
  }
}
