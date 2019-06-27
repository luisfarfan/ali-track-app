import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../providers/user.service';
import { IUser, IUserTracking, IUserTrackingDetail } from '../../interfaces/user';
import to from 'await-to-js';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'app-list-travels',
    templateUrl: './list-travels.page.html',
    styleUrls: ['./list-travels.page.scss'],
})
export class ListTravelsPage implements OnInit, OnDestroy {
    users: Array<IUser>;
    travels: Array<IUserTrackingDetail>;

    userControl = new FormControl();

    unsubscribe = new Subject();

    constructor(private userService: UserService, public modalController: ModalController) {
        this.getUsers();
    }

    ngOnInit() {
        this.userControl.valueChanges.subscribe(user => {
            this.getTravels(+user);
        });
    }

    async getUsers(): Promise<void> {
        const [error, users] = await to(this.userService.list().toPromise());
        this.users = users;
    }

    async getTravels(id: number): Promise<void> {
        const [error, travels] = await to(this.userService.getTravels(id).toPromise());
        this.travels = travels;
    }

    userSelectChange(event): void {
        this.userControl.setValue(event.detail.value);
    }

    selectTravel(travel: IUserTrackingDetail): void {
        this.modalController.dismiss(travel);
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

}
