import { Routes } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { MessagesListComponent } from './components/messages-list/messages-list.component';
import { MainLayoutComponent } from './layouts/main-layout.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { PravyPanelComponent } from './components/pravy-panel/pravy-panel.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [AuthGuard],
        children: 
        [
            {
                path: "details/:id/:?username", 
                component: DetailsComponent
            },
            {
                path: "list-of-messages", 
                component: MessagesListComponent
            },
            {
                path: "chat/:id/:?username",
                component: PravyPanelComponent
            }
        ]
    },
    {
        path: "login",
        component: LoginPageComponent
    }
];
