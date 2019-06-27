import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MapComponent } from 'ngx-mapbox-gl';
import { ModalController } from '@ionic/angular';
import { AddObservationPage } from '../../modals/add-observation/add-observation.page';
import { IUserTrackingDetail } from '../../interfaces/user';
import { ListTravelsPage } from '../../modals/list-travels/list-travels.page';

@Component({
    selector: 'app-map-detail',
    templateUrl: './map-detail.page.html',
    styleUrls: ['./map-detail.page.scss'],
})
export class MapDetailPage implements OnInit, AfterViewInit {
    @ViewChild(MapComponent) mapComponent: MapComponent;
    init = false;

    travel: IUserTrackingDetail;

    constructor(private modalController: ModalController) {
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
            // this.mapComponent.center = [this.travel.start_latitude, this.travel.start_longitude];
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
