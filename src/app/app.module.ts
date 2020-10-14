import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {TopNavMenuComponent} from './share/components/top-nav-menu/top-nav-menu.component';
import {HomeComponent} from './home/home.component';
import {ShareModule} from './share/share.module';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './share/app-routing.module';
import {NotificationService} from './share/services/notification-service/notification.service';
import {NotificationComponent} from './share/components/notification-component/notification.component';
import {AdHostDirective} from './share/directives/ad-host.directive';
import {MatCardModule} from '@angular/material/card';

@NgModule({
	declarations: [
		AppComponent,
		TopNavMenuComponent,
		HomeComponent,
		NotificationComponent,
		AdHostDirective,
	],
	imports: [
		HttpClientModule,
		BrowserAnimationsModule,
		BrowserModule,
		ShareModule,
		AppRoutingModule,
		MatCardModule
	],
	providers: [
		NotificationService
	],
	exports: [
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
