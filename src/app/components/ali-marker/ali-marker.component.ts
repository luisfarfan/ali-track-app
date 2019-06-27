import { Component, Input, OnInit } from '@angular/core';
import { IUserTrackingDetail } from '../../interfaces/user';

@Component({
    selector: 'app-ali-marker',
    templateUrl: './ali-marker.component.html',
    styleUrls: ['./ali-marker.component.scss'],
})
export class AliMarkerComponent implements OnInit {
    // @Input() userTracking: IUserTrackingDetail;

    @Input() realTime: boolean;

    constructor() {
    }

    ngOnInit() {
    }

}
