import { Component, ViewChild } from '@angular/core';

import { IonRouterOutlet, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './providers/auth.service';
import { IUser } from './interfaces/user';
import { Storage } from '@ionic/storage';
import { KEY_USER_STORAGE } from './const';
import { Router } from '@angular/router';

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

    @ViewChild(IonRouterOutlet) routerOutlet: IonRouterOutlet;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        public authService: AuthService,
        private storage: Storage,
    ) {
        this.initializeApp();

        this.authService.isLogout.subscribe(logged => {
            if (logged) {
                this.storage.get(KEY_USER_STORAGE).then(user => {
                    if (user) {
                        this.user = user;
                    } else {
                        this.user = null;
                    }
                });
            } else {
                this.user = null;
            }
        });
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }
}
