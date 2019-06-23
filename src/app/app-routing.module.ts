import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CheckIsLoggedService } from './providers/check-is-logged.service';

const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'apps', loadChildren: './tabs/tabs.module#TabsPageModule'},
    {path: 'login', loadChildren: './pages/login/login.module#LoginPageModule', canLoad: [CheckIsLoggedService]},
    {path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule'},
    {path: 'register-success', loadChildren: './pages/register-success/register-success.module#RegisterSuccessPageModule'},
    {path: 'travels', loadChildren: './pages/travels/travels.module#TravelsPageModule'},
    {path: 'my-travels', loadChildren: './pages/my-travels/my-travels.module#MyTravelsPageModule'},
    {path: 'apps/travels/:id', loadChildren: './pages/travel-detail/travel-detail.module#TravelDetailPageModule'},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
