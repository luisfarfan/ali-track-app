import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailComponent } from './user-detail.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [UserDetailComponent],
    imports: [
        IonicModule,
        CommonModule
    ],
    exports: [UserDetailComponent],
    entryComponents: [UserDetailComponent]
})
export class UserDetailModule {
}
