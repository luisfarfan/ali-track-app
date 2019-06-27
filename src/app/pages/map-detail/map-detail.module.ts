import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MapDetailPage } from './map-detail.page';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { ListTravelsPage } from '../../modals/list-travels/list-travels.page';
import { ListTravelsPageModule } from '../../modals/list-travels/list-travels.module';
import { AliMarkerModule } from '../../components/ali-marker/ali-marker.module';

const routes: Routes = [
    {
        path: '',
        component: MapDetailPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        NgxMapboxGLModule,

        ListTravelsPageModule,

        AliMarkerModule
    ],
    declarations: [MapDetailPage]
})
export class MapDetailPageModule {
}
