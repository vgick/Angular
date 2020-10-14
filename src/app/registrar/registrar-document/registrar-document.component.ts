import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ClientInAccountService, IClient} from '../../share/services/client-in-account.service';
import {RegionService} from '../../share/services/region-service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NotificationService} from '../../share/services/notification-service/notification.service';


@Component({
	selector: 'app-registrar-document',
	templateUrl: 'registrar-document.component.html',
	styleUrls: ['registrar-document.component.css']
})

export class RegistrarDocumentComponent implements OnInit, OnDestroy{
	/**
	 * Конструткор
	 * @param route Активный маршрут
	 * @param regionService Сервис по работе со списком регионов
	 * @param clientsInAccountService Сервис по работе со списком контрагентов в договоре
	 * @param snackBar Всплывающие подсказки
	 * @param notificationService Сервис уведомлений
	 */
	constructor(
		private route: ActivatedRoute,
		private regionService: RegionService,
		private clientsInAccountService: ClientInAccountService,
		private snackBar: MatSnackBar,
		private notificationService: NotificationService)
	{
		// this._router	= this.router.events.pipe(
		// 	filter((event: RouterEvent) => event instanceof NavigationEnd)
		// ).
		// subscribe(() => {
		// 	if (this.account1CCode !== undefined) {
		// 	}
		// });
	}

	/**
	 * Список контрагентов в договоре
	 */
	public clients: IClient[];

	/**
	 * Идет загрузка данных
	 */
	public loading	= false;

	// /**
	//  * Подписка на маршрут (для повторного запроса данных при прежних параметрах маршрута)
	//  */
	// private _router;

	/**
	 * Подписка на резолвер
	 */
	private _routeData;

	/**
	 * подписка на параметры
	 */
	private _routePrams;

	/**
	 * Выбранный договор
	 */
	private account1CCode	= undefined;

	/**
	 * Инициализация компонента
	 */
	ngOnInit(): void {
		this._routeData	= this.route.data.subscribe(params => {
			this.clients	= params.clients;
		});

		this._routePrams	= this.route.params.subscribe(params => {
			this.account1CCode = params.account1CCode;
		});
	}

	/**
	 * Удаление компонента
	 */
	ngOnDestroy(): void {
		// this._router.unsubscribe();
		this._routeData.unsubscribe();
		this._routePrams.unsubscribe();
	}
}
