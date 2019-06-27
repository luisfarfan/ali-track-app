import { Component, ViewChild } from '@angular/core';

import { IonRouterOutlet, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './providers/auth.service';
import { IUser } from './interfaces/user';
import { Storage } from '@ionic/storage';
import { KEY_USER_STORAGE } from './const';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { filter, first, switchMap, takeUntil } from 'rxjs/operators';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    appPages = [
        {
            title: 'Viajes',
            url: '/apps/travels',
            icon: 'list-box'
        },
    ];

    accountPages = [
        {
            title: 'Mi cuenta',
            url: '/apps/my-account',
            icon: 'person-add'
        },
    ];

    user: IUser;

    unsubscribe = new Subject();

    @ViewChild(IonRouterOutlet) routerOutlet: IonRouterOutlet;

    latitude: number;
    longitude: number;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        public authService: AuthService,
        private storage: Storage,
        private afs: AngularFirestore,
        private geolocation: Geolocation
    ) {
        this.initializeApp();

        this.authService.isLogout.subscribe(logged => {
            if (logged) {
                this.storage.get(KEY_USER_STORAGE).then(user => {
                    if (user) {
                        this.user = user;
                        this.getRealtimeUbication();
                    } else {
                        this.user = null;
                    }
                });
            } else {
                this.user = null;
            }
        });

        this.geolocation.watchPosition()
            .pipe(filter(p => p.coords !== undefined))
            .subscribe(value => {
                this.latitude = value.coords.latitude;
                this.longitude = value.coords.longitude;
            });
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    getRealtimeUbication(): void {
        this.afs.collection('user-tracking', ref => ref
            .where('user_id', '==', this.user.id)
            .where('request', '==', true))
            .stateChanges(['added', 'modified'])
            .subscribe(value => {
                if (value && value.length) {
                    this.afs.collection('user-tracking').doc(value[0].payload.doc.id).update({
                        point: {
                            longitude: this.longitude,
                            latitude: this.latitude
                        },
                        request: false,
                        done: true
                    }).then(() => {
                        setTimeout(() => {
                            this.afs.collection('user-tracking').doc(value[0].payload.doc.id).delete()
                                .then(() => '');
                        });
                    }).catch(e => {
                        // subscription.unsubscribe();
                        setTimeout(() => {
                            this.getRealtimeUbication();
                        });
                    });
                }
            });
    }
}
