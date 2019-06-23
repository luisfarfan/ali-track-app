import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { SharedModule } from './shared/shared.module';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Camera } from '@ionic-native/camera/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { Media } from '@ionic-native/media/ngx';
import { File } from '@ionic-native/file/ngx';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        SharedModule,
        IonicStorageModule.forRoot(),
        HttpClientModule,
        BrowserAnimationsModule,

        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        NgxMapboxGLModule.withConfig({
            accessToken: environment.mapboxKey
        }),
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        Keyboard,
        Geolocation
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
