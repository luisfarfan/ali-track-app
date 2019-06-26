import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListTravelsPage } from './list-travels.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
    ],
    declarations: [ListTravelsPage],
    exports: [ListTravelsPage],
    entryComponents: [ListTravelsPage]
})
export class ListTravelsPageModule {
}
