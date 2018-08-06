import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AppConfig} from './app.config';
import {WorkspaceModule} from './workspace/workspace.module';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        WorkspaceModule,
        RouterModule.forRoot([], {enableTracing: false})
    ],
    providers: [
        AppConfig,
        {
            provide: APP_INITIALIZER,
            useFactory: initConfig,
            deps: [AppConfig],
            multi: true
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

export function initConfig(config: AppConfig) {
    return () => config.load();
}
