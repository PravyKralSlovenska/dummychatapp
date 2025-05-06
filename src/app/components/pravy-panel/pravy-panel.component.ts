import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pravy-panel',
  imports: [],
  templateUrl: './pravy-panel.component.html',
  styleUrl: './pravy-panel.component.css'
})
export class PravyPanelComponent {
  @Input() serus!: string;
}
