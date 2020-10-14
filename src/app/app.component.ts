import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent} from '@angular/router';
import {AdHostDirective} from './share/directives/ad-host.directive';
import {NotificationService} from './share/services/notification-service/notification.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
	/**
	 * Конструткор
	 * @param titleService Заголовок окна
	 * @param router Роутер
	 * @param notification Сервис уведомлений
	 */
	constructor(
		private titleService: Title,
		private router: Router,
		private notification: NotificationService)
	{
		this.router.events.subscribe((event: RouterEvent) => {
				switch (true) {
					case event instanceof NavigationStart:
						this.loading = true;
						break;

					case event instanceof NavigationEnd:
					case event instanceof NavigationCancel:
					case event instanceof NavigationError:
						this.loading = false;
						break;
					default:
						break;
				}
			}
		);
	}

	/**
	 * Идет загрузка страницы, резолвинг параметров
	 */
	public loading	= false;

	/**
	 * Контейнер для сообщений
	 */
	@ViewChild(AdHostDirective, {static: true})
	adHost: AdHostDirective;

	/**
	 * Инициализация компонента
	 */
	ngOnInit(): void {
		this.titleService.setTitle('WEB договора');

		this.notification.hostContainer	= this.adHost;

		// setTimeout(() => this.notification.AddNotification(
		// 	NotificationService.createNotification(
		// 		'Заголовок 1',
		// 		'Текст уведомления 1',
		// 		NotificationType.Message)),
		// 	10
		// );
		//
		// setTimeout(() => this.notification.AddNotification(
		// 	NotificationService.createNotification(
		// 		'Заголовок 2',
		// 		'Текст уведомления 2 Текст уведомления 211111111111X',
		// 		NotificationType.Error)),
		// 	20
		// );
		//
		// setTimeout(() => this.notification.AddNotification(
		// 	NotificationService.createNotification(
		// 		'Заголовок 3',
		// 		'Http failure response for http://localhost:5000/api/clientListAPI?account=CDB190',
		// 		NotificationType.Info)),
		// 	30);
		//
		// setTimeout(() => this.notification.AddNotification(
		// 	NotificationService.createNotification(
		// 		'Заголовок 4',
		// 		'Http failure response for http://localhost:5000/api/clientListAPI?account=CDB190859&region=%D0%94%D0%B0%D0%BB%D1%8C%D0%BD%D0%',
		// 		NotificationType.Message)),
		// 	40);
	}

	/**
	 * Удаление компонента
	 */
	ngOnDestroy(): void {
		this.notification.hostContainer	= undefined;
	}
}
