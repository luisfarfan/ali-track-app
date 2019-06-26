import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
    {
        path: '',
        component: TabsPage,
        children: [
            {
                path: 'travels',
                children: [
                    {
                        path: '',
                        loadChildren: '../pages/travels/travels.module#TravelsPageModule'
                    }
                ]
            },
            {
                path: 'my-travels',
                children: [
                    {
                        path: '',
                        loadChildren: '../pages/my-travels/my-travels.module#MyTravelsPageModule'
                    }
                ]
            },
            {
                path: 'my-account',
                children: [
                    {
                        path: '',
                        loadChildren: '../pages/my-account/my-account.module#MyAccountPageModule'
                    }
                ]
            },
            {
                path: 'map-detail',
                children: [
                    {
                        path: '',
                        loadChildren: '../pages/map-detail/map-detail.module#MapDetailPageModule'
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/apps/travels',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/apps/travels',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class TabsPageRoutingModule {
}
