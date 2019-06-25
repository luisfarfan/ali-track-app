import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavController, NavParams } from '@ionic/angular';

@Component({
    selector: 'app-add-observation',
    templateUrl: './add-observation.page.html',
    styleUrls: ['./add-observation.page.scss'],
})
export class AddObservationPage implements OnInit {
    @Input() observation: string;

    constructor(private navParams: NavParams,
                public modalCtrl: ModalController,
                private navController: NavController,
                private loadingController: LoadingController) {
    }

    ngOnInit() {
    }

}
