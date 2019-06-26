import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MapComponent } from 'ngx-mapbox-gl';

@Component({
    selector: 'app-map-detail',
    templateUrl: './map-detail.page.html',
    styleUrls: ['./map-detail.page.scss'],
})
export class MapDetailPage implements OnInit, AfterViewInit {
    @ViewChild(MapComponent) mapComponent: MapComponent;
    init = false;

    constructor() {
    }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.init = true;
        }, 50);
    }

}
