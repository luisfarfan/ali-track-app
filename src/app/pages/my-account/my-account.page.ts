import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IUser } from '../../interfaces/user';
import { KEY_USER_STORAGE } from '../../const';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import to from 'await-to-js';
import { UserService } from '../../providers/user.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
    selector: 'app-my-account',
    templateUrl: './my-account.page.html',
    styleUrls: ['./my-account.page.scss'],
})
export class MyAccountPage implements OnInit {
    user: IUser;

    registerForm: FormGroup;

    loading;

    constructor(private storage: Storage,
                private fb: FormBuilder,
                private userService: UserService,
                private loadingController: LoadingController,
                private toastController: ToastController) {
        this.storage.get(KEY_USER_STORAGE).then(user => {
            this.user = user;
            this.createForm();
        });
    }

    ngOnInit() {

    }

    createForm(): void {
        this.registerForm = this.fb.group({
            username: [this.user.username, Validators.required],
            telefono1: [this.user.telefono1, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
            nombre: [this.user.nombre, Validators.required],
            apellido_paterno: [this.user.apellido_paterno, Validators.required],
            apellido_materno: [this.user.apellido_materno, Validators.required],
            correo: [this.user.correo, [Validators.required, Validators.email]],
            role: [1]
        });
    }

    async save(): Promise<void> {
        this.presentLoading();
        const [error, user] = await to(this.userService.patch(this.user.id, this.registerForm.getRawValue()).toPromise());
        await this.loading.dismiss();
        if (user) {
            this.presentToast();
        } else {
            this.presentToast('Error al guardar información');
        }
    }

    async presentLoading() {
        this.loading = await this.loadingController.create({
            message: 'Cargando',
        });
        await this.loading.present();
    }

    async presentToast(msg?: string) {
        const toast = await this.toastController.create({
            message: msg || 'Datos cambiados correctamente!',
            duration: 4000
        });
        toast.present();
    }

}
