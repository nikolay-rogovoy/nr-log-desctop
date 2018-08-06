import {Route} from '@angular/router';
import {WorkspaceComponent} from './workspace.component';
import {PageNotFoundComponent} from './components/page-not-found-component/page-not-found-component';
import {AuthComponent} from './components/auth-component/auth-component';
import {AuthGuard} from './admin/auth-guard';
import {AccessDeniedComponent} from './components/access-denied-component/access-denied-component';
import {DashboardComponent} from './components/dashboard-component/dashboard-component';

export const MODULE_ROUTES: Route[] = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'login', component: AuthComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'access_denied', component: AccessDeniedComponent, canActivate: [AuthGuard] },
    // Ошибка поиска маршрута
    { path: '**', component: PageNotFoundComponent, canActivate: [AuthGuard] },

];

export const MODULE_COMPONENTS = [
    PageNotFoundComponent,
    AuthComponent,
    AccessDeniedComponent,
    DashboardComponent,
    WorkspaceComponent
];

export const MODULE_EXPORTS = [
    WorkspaceComponent
];
