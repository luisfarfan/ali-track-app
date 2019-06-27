import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MapComponent } from 'ngx-mapbox-gl';
import { ModalController, ToastController } from '@ionic/angular';
import { AddObservationPage } from '../../modals/add-observation/add-observation.page';
import { IUserTrackingDetail } from '../../interfaces/user';
import { ListTravelsPage } from '../../modals/list-travels/list-travels.page';
import { AuthService } from '../../providers/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

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

    constructor(private modalController: ModalController,
                public authService: AuthService,
                private afs: AngularFirestore,
                private toastController: ToastController) {
    }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.init = true;
        }, 50);
    }

    async openTravels(): Promise<void> {
        await this.presentModal();
    }

    getRealtimeUbication(): void {
        const subscription = this.afs.collection('user-tracking', ref => ref
            .where('user_id', '==', this.travel.user.id)
            .where('request', '==', false))
            .valueChanges()
            .subscribe(value => {
                if (value && value.length === 0) {
                    this.afs.collection('user-tracking').add({
                        user_id: this.travel.user.id,
                        request: true,
                        point: {latitude: 0, longitude: 0},
                        done: false
                    });
                } else if (value && value.length > 0) {
                    if ((value[0] as any).point && (value[0] as any).point.latitude) {
                        this.realTime.latitude = (value[0] as any).point.latitude;
                        this.realTime.longitude = (value[0] as any).point.longitude;
                        this.realTimeDone = true;
                        this.mapComponent.mapInstance.setCenter([this.realTime.longitude, this.realTime.latitude]);
                        this.presentToast();
                        // this.afs.collection('user-tracking').doc(value[0].payload.doc.id)
                        //     .delete()
                        //     .then(() => {
                        //         subscription.unsubscribe();
                        //     });
                    } else {
                        this.realTimeDone = false;
                    }
                    subscription.unsubscribe();
                }
            });
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


}
