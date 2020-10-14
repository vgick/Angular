import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import { HomeComponent } from '../home/home.component';

const routes: Routes = [
	{ path: '', component: HomeComponent, pathMatch: 'full' },
	{ path: 'registrar', loadChildren: () => import('../registrar/registrar.module').then((m) => m.RegistrarModule)},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload'})],
	exports: [RouterModule]
})
export class AppRoutingModule { }
