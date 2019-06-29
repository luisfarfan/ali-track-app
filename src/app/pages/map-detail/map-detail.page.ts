import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MapComponent } from 'ngx-mapbox-gl';
import { ModalController, PopoverController, ToastController } from '@ionic/angular';
import { AddObservationPage } from '../../modals/add-observation/add-observation.page';
import { IUser, IUserTrackingDetail } from '../../interfaces/user';
import { ListTravelsPage } from '../../modals/list-travels/list-travels.page';
import { AuthService } from '../../providers/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import to from 'await-to-js';
import { UserService } from '../../providers/user.service';
import { UserDetailComponent } from '../../components/user-detail/user-detail.component';

export interface IUserWithTracking extends IUser {
    latitude?: number;
    longitude?: number;
}

@Component({
    selector: 'app-map-detail',
    templateUrl: './map-detail.page.html',
    styleUrls: ['./map-detail.page.scss'],
})
export class MapDetailPage implements OnInit, AfterViewInit {
    @ViewChild(MapComponent) mapComponent: MapComponent;
    init = false;

    travel: IUserTrackingDetail;

    source;

    realTime: {
        latitude: number;
        longitude: number
    } = {
        latitude: 0,
        longitude: 0
    };

    realTimeDone = false;

    users: Array<IUserWithTracking>;

    usersFiltered: Array<IUserWithTracking>;

    constructor(private modalController: ModalController,
                public authService: AuthService,
                private afs: AngularFirestore,
                private toastController: ToastController,
                private userService: UserService,
                private popoverController: PopoverController) {
    }

    ngOnInit() {
        this.getUsers();
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.init = true;
        }, 50);
    }

    async openTravels(): Promise<void> {
        await this.presentModal();
    }

    async getUsers(): Promise<void> {
        const [error, users] = await to(this.userService.list().toPromise());
        this.users = users;
    }

    findRealTimeUbications(): void {
        this.users.forEach(u => this.getRealtimeUbication(u));
    }

    getRealtimeUbication(user: IUserWithTracking): void {
        const takeUntilSubject = new Subject();
        const subscription = this.afs.collection('user-tracking', ref => ref
            .where('user_id', '==', user.id)
            .where('request', '==', false))
            .valueChanges()
            .subscribe(value => {
                if (value && value.length === 0) {
                    this.afs.collection('user-tracking', ref => ref
                        .where('user_id', '==', user.id))
                        .valueChanges()
                        .pipe(takeUntil(takeUntilSubject))
                        .subscribe(value1 => {
                            if (value1 && value1.length === 0) {
                                this.afs.collection('user-tracking').add({
                                    user_id: user.id,
                                    request: true,
                                    point: {latitude: 0, longitude: 0},
                                    done: false
                                });
                            }
                            takeUntilSubject.next();
                            takeUntilSubject.complete();
                        });
                } else if (value && value.length > 0) {
                    if ((value[0] as any).point && (value[0] as any).point.latitude) {
                        const indexUser = this.users.findIndex(u => u.id === user.id);
                        this.users[indexUser].longitude = (value[0] as any).point.longitude;
                        this.users[indexUser].latitude = (value[0] as any).point.latitude;
                        this.validUsersInMapForRealtime();
                        this.mapComponent.mapInstance.setCenter([this.users[indexUser].longitude, this.users[indexUser].latitude]);
                        this.presentToast();
                    }
                    subscription.unsubscribe();
                }
            });
    }

    private validUsersInMapForRealtime(): void {
        this.usersFiltered = this.users.filter(u => u.latitude && u.longitude);
    }

    setMarker(travel: IUserTrackingDetail): void {
        this.travel = travel;
        if (this.travel.start_latitude) {
            this.mapComponent.mapInstance.setCenter([this.travel.start_longitude, this.travel.start_latitude]);
            if (this.travel.start_latitude && this.travel.end_latitude) {
                this.source = {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: [{
                            type: 'Feature',
                            geometry: {
                                type: 'LineString',
                                properties: {},
                                coordinates: [
                                    [this.travel.start_longitude, this.travel.start_latitude],
                                    [this.travel.end_longitude, this.travel.end_latitude]
                                ]
                            }
                        }]
                    }
                };
            } else {
                this.source = null;
            }
        } else {
            this.source = null;
        }
    }

    async presentModal(): Promise<void> {
        const modal = await this.modalController.create({
            component: ListTravelsPage,
            componentProps: {
                users: this.users
            }
        });

        modal.onDidDismiss().then(data => {
            this.setMarker(data.data);
        });

        return await modal.present();
    }

    async presentToast() {
        const toast = await this.toastController.create({
            message: 'Ubicación en tiempo real actualizada',
            duration: 5000,
            color: 'success',
            showCloseButton: true
        });
        toast.present();
    }

    async presentPopover(user: IUser) {
        const popover = await this.popoverController.create({
            component: UserDetailComponent,
            translucent: true,
            componentProps: {
                user
            }
        });
        return await popover.present();
    }


}
