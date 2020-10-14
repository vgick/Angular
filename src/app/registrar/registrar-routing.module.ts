import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegistrarDocumentsComponent} from './registrar-documents/registrar-documents.component';
import {RegistrarDocumentComponent} from './registrar-document/registrar-document.component';
import {ClientsResolver} from '../share/resolvers/clients.resolver';

const routes: Routes = [
		{ path: '', component: RegistrarDocumentsComponent, children: [
				{path: ':account1CCode', component: RegistrarDocumentComponent, resolve: {clients: ClientsResolver }, runGuardsAndResolvers: 'always'}
		]}
	];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class RegistrarRoutingModule { }
