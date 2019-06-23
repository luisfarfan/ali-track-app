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
                path: 'my-account',
                children: [
                    {
                        path: '',
                        loadChildren: '../pages/my-account/my-account.module#MyAccountPageModule'
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
