import { Injectable } from '@angular/core';
import { UserEndpoint } from '../endpoints/user.endpoint';
import { ICredentials, IUser } from '../interfaces/user';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { KEY_USER_STORAGE } from '../const';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    authenticated: boolean;
    isLogout: BehaviorSubject<boolean> = new BehaviorSubject(this.authenticated);

    constructor(private http: HttpClient,
                private storage: Storage,
                private router: Router) {
        this.storage.get(KEY_USER_STORAGE)
            .then(user => {
                if (user) {
                    this.authenticated = true;
                    this.isLogout.next(true);
                } else {
                    this.authenticated = false;
                    this.isLogout.next(false);
                }
            });
    }

    isAuthenticated(): boolean {
        return this.authenticated;
    }

    authenticate(credentials: ICredentials): Observable<IUser> {
        return this.http.post<IUser>(UserEndpoint.authenticate, credentials)
            .pipe(
                tap(user => {
                    this.storage.set(KEY_USER_STORAGE, user).then(() => {
                        this.isLogout.next(true);
                    });
                }));
    }

    async logout(redirect?: boolean): Promise<void> {
        this.storage.clear()
            .then(() => this.isLogout.next(false));
        if (redirect) {
            this.router.navigateByUrl('/login');
        }
    }
}
