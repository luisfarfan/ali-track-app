import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MyAccountPage } from './my-account.page';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
    {
        path: '',
        component: MyAccountPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        SharedModule
    ],
    declarations: [MyAccountPage]
})
export class MyAccountPageModule {
}
