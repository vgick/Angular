import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ClientInAccountService, IClient} from '../services/client-in-account.service';
import {Observable, of} from 'rxjs';
import {RegionService} from '../services/region-service';
import {Injectable} from '@angular/core';
import {catchError, tap} from 'rxjs/operators';
import {NotificationService} from '../services/notification-service/notification.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({providedIn: 'root'})
export class ClientsResolver implements Resolve<IClient[]> {
	constructor(
		private clientsInAccountService: ClientInAccountService,
		private region: RegionService,
		private snackBar: MatSnackBar,
		private notificationService: NotificationService
	) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IClient[]> {
		return this.clientsInAccountService.GetClients(route.params.account1CCode, this.region.currentRegion.getValue()).
			pipe(
				tap((clients) => {
					if (clients.length > 0) {
						this.snackBar.open(`В договоре ${clients.length} контрагент`, 'закрыть', {
							duration: 1000
						});
					}
					else {
						this.snackBar.open(`Договор ${route.params.account1CCode} в базе не найден`, 'закрыть', {
							duration: 5000
						});
					}
				}),
				catchError(error => {
					this.notificationService.AddNotification(NotificationService.createErrorNotification(error, 'Не удалось получить список клиентов по договору'));
					return of(null );
				})
			);
	}
}
