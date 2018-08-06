import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {AtGridModule} from 'at-grid';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MODULE_COMPONENTS, MODULE_EXPORTS, MODULE_ROUTES} from './workspace.routes';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './admin/auth-interceptor';
import {ServiceProvider} from './services/service-provider';
import {AuthService} from './admin/auth-service';
import {AuthGuard} from './admin/auth-guard';
import {GrantGuard} from './admin/grant-guard';

@NgModule({
    imports: [
        BrowserModule, FormsModule, ReactiveFormsModule,
        HttpClientModule,
        AtGridModule,
        RouterModule.forChild(MODULE_ROUTES)
    ],
    providers: [
        ServiceProvider,
        AuthService,
        AuthGuard,
        GrantGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        }
    ],
    declarations: [MODULE_COMPONENTS],
    exports: [MODULE_EXPORTS],
    entryComponents: []
})
export class WorkspaceModule {
    constructor() {
    }
}
