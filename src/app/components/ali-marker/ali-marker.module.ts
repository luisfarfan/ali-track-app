import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AliMarkerComponent } from './ali-marker.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [AliMarkerComponent],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [AliMarkerComponent]
})
export class AliMarkerModule {
}
