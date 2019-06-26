import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MapDetailPage } from './map-detail.page';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

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
        NgxMapboxGLModule
    ],
    declarations: [MapDetailPage]
})
export class MapDetailPageModule {
}
