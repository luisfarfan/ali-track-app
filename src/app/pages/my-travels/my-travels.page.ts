import { Component, OnInit } from '@angular/core';
import { IUser, IUserTrackingDetail } from '../../interfaces/user';
import { Subscription } from 'rxjs';
import { UserService } from '../../providers/user.service';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { generateMapBoxStaticImage } from '../../shared/utils';
import { KEY_USER_STORAGE } from '../../const';
import to from 'await-to-js';

@Component({
    selector: 'app-my-travels',
    templateUrl: './my-travels.page.html',
    styleUrls: ['./my-travels.page.scss'],
})
export class MyTravelsPage implements OnInit {
    travels: Array<IUserTrackingDetail>;

    travelsFiltered: Array<IUserTrackingDetail>;

    longitude: number;
    latitude: number;
    subscription: Subscription;

    defaultMapUrl: string;

    user: IUser;

    loading;

    constructor(private userService: UserService,
                private storage: Storage,
                private geolocation: Geolocation,
                private loadingController: LoadingController,
                private toastController: ToastController,
                private router: Router,
                private navController: NavController) {
    }

    ngOnInit() {
        this.subscription = this.geolocation.watchPosition()
            .pipe(filter((p) => p.coords !== undefined))
            .subscribe(position => {
                this.longitude = position.coords.longitude;
                this.latitude = position.coords.latitude;

                this.defaultMapUrl = generateMapBoxStaticImage(this.longitude, this.latitude, 13);
            });

        this.storage.get(KEY_USER_STORAGE).then(user => {
            this.user = user;
            this.getTravels();
        });
    }

    async getTravels(): Promise<void> {
        const [error, travels] = await to(this.userService.getTravels(this.user.id).toPromise());
        this.travels = travels;

        this.travels = this.travels.map(t => {
            t.url = t.start_latitude ? generateMapBoxStaticImage(t.start_longitude, t.start_latitude, 13) : this.defaultMapUrl;
            return t;
        });
        this.travelsFiltered = [...this.travels];
    }

    goTravelDetail(id: number): void {
        this.navController.navigateForward(`/apps/travels/${id}`);
    }

    filterByDate(date: CustomEvent): void {
        this.travelsFiltered = this.travels.filter(t => {
            const startDate = new Date(t.starttask);
            const filterDate = new Date(date.detail.value);

            return startDate.getMonth() === filterDate.getMonth()
                && startDate.getFullYear() === filterDate.getFullYear()
                && startDate.getDay() === filterDate.getDay();
        });
    }

}
