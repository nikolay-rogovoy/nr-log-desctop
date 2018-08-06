import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {ServiceProvider} from '../services/service-provider';
import {of} from 'rxjs/observable/of';

/***/
@Injectable()
export class GrantGuard implements CanActivate {

    /***/
    constructor(private router: Router,
                private service: ServiceProvider) {
    }

    /***/
    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> {
        // this.router.navigateByUrl('access_denied');
        return of(true);
    }
}
