import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../providers/user.service';
import { IUser, IUserTrackingDetail } from '../../interfaces/user';

@Component({
    selector: 'app-list-travels',
    templateUrl: './list-travels.page.html',
    styleUrls: ['./list-travels.page.scss'],
})
export class ListTravelsPage implements OnInit {
    users: Array<IUser>;
    travels: Array<IUserTrackingDetail>;

    constructor(private userService: UserService) {
    }

    ngOnInit() {
    }

    async getUsers(): Promise<void> {
        // const [error, users] =
    }

}
