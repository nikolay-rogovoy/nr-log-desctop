import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth-service';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {ServiceProvider} from '../services/service-provider';

/***/
@Injectable()
export class AuthGuard implements CanActivate {

    /***/
    constructor(private router: Router,
                private auth: AuthService,
                private service: ServiceProvider) {
    }

    /***/
    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> {

        if (!this.auth.authenticated) {
            this.router.navigateByUrl('/login');
        } else {
            return of(true);
        }
    }
}
