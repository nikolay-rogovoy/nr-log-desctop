import {Route} from '@angular/router';
import {WorkspaceComponent} from './workspace.component';
import {PageNotFoundComponent} from './components/page-not-found-component/page-not-found-component';
import {AuthComponent} from './components/auth-component/auth-component';
import {AuthGuard} from './admin/auth-guard';
import {AccessDeniedComponent} from './components/access-denied-component/access-denied-component';
import {DashboardComponent} from './components/dashboard-component/dashboard-component';
import {SumFactComponent} from './components/fact/sum-fact-component/sum-fact-component';
import {FactDetailComponent} from './components/fact/fact-detail-component/fact-detail-component';

export const MODULE_ROUTES: Route[] = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'login', component: AuthComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'access_denied', component: AccessDeniedComponent, canActivate: [AuthGuard] },
    { path: 'sum_fact', component: SumFactComponent, canActivate: [AuthGuard] },
    // Ошибка поиска маршрута
    { path: '**', component: PageNotFoundComponent, canActivate: [AuthGuard] },

];

export const MODULE_COMPONENTS = [
    PageNotFoundComponent,
    AuthComponent,
    AccessDeniedComponent,
    DashboardComponent,
    WorkspaceComponent,
    SumFactComponent,
    FactDetailComponent
];

export const MODULE_EXPORTS = [
    WorkspaceComponent
];
