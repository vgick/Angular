import {NgModule} from '@angular/core';
import {RegistrarClientCardComponent} from './registrar-client-card/registrar-client-card.component';
import {RegistrarDocumentsComponent} from './registrar-documents/registrar-documents.component';
import {RegistrarFileUploadedComponent} from './registrar-file-uploaded/registrar-file-uploaded.component';
import {RegistrarUploadFilesComponent} from './registrar-upload-files/registrar-upload-files.component';
import {PhotoListComponent} from './photo-list/photo-list.component';
import {RegistrarDocumentComponent} from './registrar-document/registrar-document.component';
import {RegistrarDocumentsService} from '../share/services/registrar-documents-service';
import {RegistrarFileService} from '../share/services/registrar-file.service';
import {PhotoService} from '../share/services/photo.service';
import {CommonModule} from '@angular/common';
import {ShareModule} from '../share/share.module';
import {RouterModule} from '@angular/router';
import {RegistrarRoutingModule} from './registrar-routing.module';
import {ChatModule} from '../chat/chat.module';
import {MatSortModule} from '@angular/material/sort';

@NgModule({
	declarations: [
		RegistrarDocumentsComponent,
		RegistrarDocumentComponent,
		RegistrarClientCardComponent,
		RegistrarFileUploadedComponent,
		RegistrarUploadFilesComponent,
		PhotoListComponent,
	],
	imports: [
		CommonModule,
		ShareModule,
		ChatModule,
		RegistrarRoutingModule,
		MatSortModule,
	],
	providers: [
		RegistrarDocumentsService,
		RegistrarFileService,
		PhotoService
	],
	exports: [
		RegistrarDocumentsComponent,
		RegistrarDocumentComponent,
		RouterModule
	]
})
export class RegistrarModule { }
