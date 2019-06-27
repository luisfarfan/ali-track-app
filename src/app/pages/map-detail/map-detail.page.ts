import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MapComponent } from 'ngx-mapbox-gl';
import { ModalController } from '@ionic/angular';
import { AddObservationPage } from '../../modals/add-observation/add-observation.page';
import { IUserTrackingDetail } from '../../interfaces/user';
import { ListTravelsPage } from '../../modals/list-travels/list-travels.page';
import { AuthService } from '../../providers/auth.service';

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

    constructor(private modalController: ModalController, public authService: AuthService) {
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


}
