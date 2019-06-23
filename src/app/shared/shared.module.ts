import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputErrorMessageComponent } from './components/input-error-message/input-error-message.component';
import { IonicModule } from '@ionic/angular';
import { BackgroundImageComponent } from './components/background-image/background-image.component';
import { CustomCheckboxComponent } from './components/custom-checkbox/custom-checkbox.component';
import { FillContainerComponent } from './components/fill-container/fill-container.component';
import { PreloadImageComponent } from './components/preload-image/preload-image.component';
import { ShowHidePasswordComponent } from './components/show-hide-password/show-hide-password.component';
import { TextShellComponent } from './components/text-shell/text-shell.component';

@NgModule({
    declarations: [InputErrorMessageComponent, BackgroundImageComponent, CustomCheckboxComponent, FillContainerComponent,
        PreloadImageComponent, ShowHidePasswordComponent, TextShellComponent],
    imports: [
        CommonModule,
        IonicModule,
    ],
    exports: [InputErrorMessageComponent, BackgroundImageComponent, CustomCheckboxComponent,
        FillContainerComponent, PreloadImageComponent, ShowHidePasswordComponent, TextShellComponent]
})
export class SharedModule {
}
