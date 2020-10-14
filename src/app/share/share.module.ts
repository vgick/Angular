import {NgModule} from '@angular/core';
import {SelectAccountComponent} from './components/select-account/select-account.component';
import {RegionSelectorComponent} from './components/region-selector.component/region-selector.component';
import {SideNavMenuComponent} from './components/side-nav-menu/side-nav-menu.component';
import {AccountListComponent} from './components/accounts-list/account-list.component';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import {HttpClientModule} from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {RouterModule} from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
import {MessageDetailsComponent} from './components/notification-component/message-details.component';
import {NotificationColorDirective} from './directives/notification-color.directives';
import {MatSortModule} from '@angular/material/sort';

@NgModule({
	declarations: [
		SideNavMenuComponent,
		SelectAccountComponent,
		RegionSelectorComponent,
		AccountListComponent,
		MessageDetailsComponent,
		NotificationColorDirective
	],
	imports: [
		MatIconModule,
		MatSnackBarModule,
		MatListModule,
		MatButtonModule,
		FormsModule,
		CommonModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		MatExpansionModule,
		MatTableModule,
		MatCardModule,
		MatProgressBarModule,
		RouterModule,
		MatDialogModule,
		MatSortModule,
	],
	exports: [
		MatIconModule,
		HttpClientModule,
		MatSnackBarModule,
		MatListModule,
		MatButtonModule,
		FormsModule,
		CommonModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		MatExpansionModule,
		MatTableModule,
		MatCardModule,
		MatProgressBarModule,

		SideNavMenuComponent,
		SelectAccountComponent,
		RegionSelectorComponent,
		AccountListComponent,
		MessageDetailsComponent,
		NotificationColorDirective
	]
})
export class ShareModule { }
