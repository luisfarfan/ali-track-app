import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingController, MenuController, NavController, Platform, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Router } from '@angular/router';
import { AuthService } from '../../providers/auth.service';
import to from 'await-to-js';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit, AfterViewInit, OnDestroy {
    loginForm: FormGroup;

    loading;

    backButtonSubscription: Subscription;

    constructor(private menu: MenuController,
                private platform: Platform,
                private fb: FormBuilder,
                public keyboard: Keyboard,
                private router: Router,
                private loadingController: LoadingController,
                private authService: AuthService,
                private toastController: ToastController,
                private navController: NavController) {
        this.createForm();
    }

    ngOnInit() {
        this.menu.enable(false);
    }

    ngAfterViewInit(): void {
        this.backButtonSubscription = this.platform.backButton.subscribe(() => {
            (navigator as any).app.exitApp();
        });
    }

    createForm(): void {
        this.loginForm = this.fb.group({
            username: [null, [Validators.required]],
            password: [null, [Validators.required]],
        });
    }

    login(): void {
        this.authenticate();
    }

    async authenticate(): Promise<void> {
        await this.presentLoading();
        const [error, auth] = await to(this.authService.authenticate(this.loginForm.getRawValue()).toPromise());
        await this.loading.dismiss();
        if (auth) {
            this.menu.enable(true);
            this.navController.navigateRoot('/apps');
        } else {
            this.presentToast();
        }
    }

    async presentLoading() {
        this.loading = await this.loadingController.create({
            message: 'Validando credenciales',
        });
        this.loading.present();
    }

    async presentToast() {
        const toast = await this.toastController.create({
            message: 'Credenciales incorrectas',
            duration: 3000,
            color: 'warning',
            showCloseButton: true
        });
        toast.present();
    }

    ngOnDestroy(): void {
        this.backButtonSubscription.unsubscribe();
    }


}
