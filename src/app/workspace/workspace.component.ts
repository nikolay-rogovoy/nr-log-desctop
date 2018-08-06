import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from './admin/auth-service';
import {Router} from '@angular/router';

/***/
@Component({
    moduleId: module.id,
    selector: 'app-workspace-component',
    templateUrl: 'workspace.component.html'
})
export class WorkspaceComponent implements OnInit {

    /**Конструктор*/
    constructor(public auth: AuthService, public router: Router) {
    }

    /***/
    ngOnInit() {
    }

    /***/
    logOut() {
        this.auth.clear();
        this.router.navigate(['/login']);
    }

    get authenticated(): boolean {
        return this.auth.authenticated;
    }
}
