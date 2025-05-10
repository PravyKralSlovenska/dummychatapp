import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { HornaListinaComponent } from '../components/horna-listina/horna-listina.component'
import { LavyPanelComponent } from '../components/lavy-panel/lavy-panel.component'
import { PravyPanelComponent } from '../components/pravy-panel/pravy-panel.component'

@Component({
    selector: 'app-main-layout',
    styleUrl: "./main-layout.component.css",
    standalone: true,
    imports: [RouterOutlet, HornaListinaComponent, LavyPanelComponent, PravyPanelComponent],
    template: `
		<div class="app-container">
            <header class="app-header">
                <app-horna-listina />
            </header>
            
            <main class="app-main">
                <div class="left-panel">
                    <app-lavy-panel />
                </div>
                <div class="center-panel">
                    <router-outlet />
                </div>
                <div class="right-panel">
                    <app-pravy-panel />
                </div>
            </main>
        </div>
	`
})
export class MainLayoutComponent { }
