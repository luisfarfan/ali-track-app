import { Component, OnDestroy, OnInit } from '@angular/core';
import { generateMapBoxStaticImage } from '../../shared/utils';
import { UserService } from '../../providers/user.service';
import { IUser, IUserTracking, IUserTrackingDetail } from '../../interfaces/user';
import to from 'await-to-js';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { KEY_USER_STORAGE } from '../../const';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
    selector: 'app-travels',
    templateUrl: './travels.page.html',
    styleUrls: ['./travels.page.scss'],
})
export class TravelsPage implements OnInit, OnDestroy {
    travels: Array<IUserTrackingDetail>;

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
        }).filter(t => !(t.starttask && t.endtask));
    }

    async addTravel(): Promise<void> {
        await this.presentLoading();
        const travel: Partial<IUserTracking> = {
            user: this.user.id,
        };
        const [error, tracking] = await to(this.userService.addTravels(travel).toPromise());
        await this.loading.dismiss();

        this.getTravels();
    }

    async doTravel(id: number, init?: boolean): Promise<void> {
        await this.presentLoading();
        let travel: Partial<IUserTracking> = {
            user: this.user.id,
        };
        if (init) {
            travel = {...travel, start_latitude: this.latitude, start_longitude: this.longitude, starttask: (new Date() as any)};
        } else {
            travel = {...travel, end_latitude: this.latitude, end_longitude: this.longitude, endtask: (new Date() as any)};
        }
        const [error, tracking] = await to(this.userService.patchTravel(id, travel).toPromise());
        await this.loading.dismiss();
        this.getTravels();
        this.presentToast(init);
        if (!init) {
            this.goTravelDetail(tracking.id);
        }
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    async presentLoading() {
        this.loading = await this.loadingController.create({
            message: 'Cargando',
        });
        await this.loading.present();
    }

    goTravelDetail(id: number): void {
        this.navController.navigateForward(`/apps/travels/${id}`);
    }

    async presentToast(init?: boolean) {
        const toast = await this.toastController.create({
            message: init ? 'Viaje iniciado' : 'Viaje finalizado',
            duration: 5000,
            color: 'success'
        });
        toast.present();
    }

}
