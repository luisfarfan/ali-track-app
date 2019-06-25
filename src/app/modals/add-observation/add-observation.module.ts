import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddObservationPage } from './add-observation.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
    ],
    declarations: [AddObservationPage],
    exports: [AddObservationPage],
    entryComponents: [AddObservationPage]
})
export class AddObservationPageModule {
}
