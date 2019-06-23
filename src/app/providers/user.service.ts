import { Injectable } from '@angular/core';
import { IUser, IUserTracking, IUserTrackingDetail } from '../interfaces/user';
import { Observable } from 'rxjs';
import { UserEndpoint } from '../endpoints/user.endpoint';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { KEY_USER_STORAGE } from '../const';
import '../shared/prototypes/string';
import { Storage } from '@ionic/storage';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient,
                private storage: Storage,
                private authService: AuthService,
                private firestore: AngularFirestore) {

    }

    add(user: IUser): Observable<IUser> {
        return this.http.post<IUser>(UserEndpoint.listPost, user);
    }

    edit(id: number, user: IUser): Observable<IUser> {
        return this.http.put<IUser>(`${UserEndpoint.listPost}${id}/`, user)
            .pipe(tap(response => this.setUser(response)));
    }

    patch(id: number, user: IUser): Observable<IUser> {
        return this.http.patch<IUser>(`${UserEndpoint.listPost}${id}/`, user)
            .pipe(tap(response => this.setUser(response)));
    }

    private setUser(user): void {
        this.storage.get(KEY_USER_STORAGE)
            .then(loggedUser => {
                loggedUser.user = user;
                this.storage.set(KEY_USER_STORAGE, loggedUser)
                    .then(() => this.authService.isLogout.next(true));
            });
    }

    getTravels(user: number): Observable<Array<IUserTrackingDetail>> {
        return this.http.get<Array<IUserTrackingDetail>>(UserEndpoint.travelsUser.format(user));
    }

    addTravels(travel: Partial<IUserTracking>): Observable<IUserTracking> {
        return this.http.post<IUserTracking>(UserEndpoint.tracking, travel);
    }

    patchTravel(id: number, travel: Partial<IUserTracking>): Observable<IUserTracking> {
        return this.http.patch<IUserTracking>(`${UserEndpoint.tracking}${id}/`, travel);
    }

    getTravel(id: number): Observable<IUserTracking> {
        return this.http.get<IUserTracking>(`${UserEndpoint.tracking}${id}/`);
    }
}
