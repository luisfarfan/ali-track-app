import { Component, OnInit } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import to from 'await-to-js';
import { UserService } from '../../providers/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    registerForm: FormGroup;
    loading;

    constructor(public keyboard: Keyboard,
                private fb: FormBuilder,
                private loadingController: LoadingController,
                private userService: UserService,
                private toastController: ToastController,
                private router: Router) {
        this.createForm();
    }

    ngOnInit() {
    }

    createForm(): void {
        this.registerForm = this.fb.group({
            username: [null, Validators.required],
            telefono1: [null, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
            nombre: [null, Validators.required],
            apellido_paterno: [null, Validators.required],
            apellido_materno: [null, Validators.required],
            correo: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required]],
            role: [null]
        });
    }

    async register(): Promise<void> {
        await this.presentLoading();
        const [error, res] = await to(this.userService.add(this.registerForm.getRawValue()).toPromise());
        await this.loading.dismiss();
        if (res) {
            this.router.navigateByUrl('/register-success');
        } else {
            this.presentToast();
        }
    }

    async presentLoading() {
        this.loading = await this.loadingController.create({
            message: 'Cargando',
        });
        this.loading.present();
    }

    async presentToast() {
        const toast = await this.toastController.create({
            message: 'DNI y/o teléfono ya existen!',
            duration: 4000
        });
        toast.present();
    }

}
