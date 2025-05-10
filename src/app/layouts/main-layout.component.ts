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
		<body>
            <header>
                <app-horna-listina />
            </header>
            
            <main>
                <app-lavy-panel />
                <div>
                    <router-outlet />
                </div>
                <app-pravy-panel />
            </main>
        </body>
	`
})
export class MainLayoutComponent {}
