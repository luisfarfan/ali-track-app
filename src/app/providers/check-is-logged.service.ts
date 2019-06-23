import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { KEY_USER_STORAGE } from '../const';
import { Storage } from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class CheckIsLoggedService implements CanLoad {
    constructor(private storage: Storage, private router: Router) {
    }

    canLoad() {
        return this.storage.get(KEY_USER_STORAGE).then(res => {
            if (res) {
                this.router.navigate(['/apps']);
                return false;
            } else {
                return true;
            }
        });
    }
}
