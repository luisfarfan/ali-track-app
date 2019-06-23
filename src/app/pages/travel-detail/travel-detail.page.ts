import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { KEY_USER_STORAGE } from '../../const';
import { IUser, IUserTracking } from '../../interfaces/user';
import { UserService } from '../../providers/user.service';
import to from 'await-to-js';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
    selector: 'app-travel-detail',
    templateUrl: './travel-detail.page.html',
    styleUrls: ['./travel-detail.page.scss'],
})
export class TravelDetailPage implements OnInit, AfterViewInit {
    id: number;

    signaturePadOptions: object = {
        minWidth: 5,
        canvasWidth: 500,
        canvasHeight: 200
    };

    travelForm: FormGroup;

    @ViewChild(SignaturePad) signaturePad: SignaturePad;

    user: IUser;

    travel: IUserTracking;

    loading;

    constructor(private route: ActivatedRoute,
                private fb: FormBuilder,
                private storage: Storage,
                private userService: UserService,
                private loadingController: LoadingController,
                private toastController: ToastController) {
        this.route.params.subscribe(params => {
            this.id = params.id;

            this.storage.get(KEY_USER_STORAGE).then(user => {
                this.user = user;
                this.getTravel();
            });
        });
    }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
        this.signaturePad.set('minWidth', 5);
        this.signaturePad.clear();
    }

    createForm(): void {
        this.travelForm = this.fb.group({
            user: [this.user.id],
            signature: [null, Validators.required],
            rating: [this.travel.rating, Validators.required]
        });
    }

    async getTravel(): Promise<void> {
        const [error, travel] = await to(this.userService.getTravel(this.id).toPromise());
        this.travel = travel;

        this.createForm();
    }

    async saveTravel(): Promise<void> {
        await this.presentLoading();
        const tracking: Partial<IUserTracking> = {
            signature: this.travelForm.get('signature').value,
            rating: this.travelForm.get('rating').value
        };
        const [error, travel] = await to(this.userService.patchTravel(this.id, tracking).toPromise());
        await this.loading.dismiss();
        this.presentToast();
    }

    drawComplete() {
        this.travelForm.get('signature').setValue(this.signaturePad.toDataURL());
    }

    drawStart() {
        console.log('begin drawing');
    }

    async presentLoading() {
        this.loading = await this.loadingController.create({
            message: 'Cargando',
        });
        this.loading.present();
    }

    async presentToast() {
        const toast = await this.toastController.create({
            message: 'Servicio finalizado coon éxito!',
            duration: 5000,
            color: 'success'
        });
        toast.present();
    }

}
