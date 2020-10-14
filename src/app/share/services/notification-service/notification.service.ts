import {ComponentFactoryResolver, ComponentRef, Injectable} from '@angular/core';
import {AdHostDirective} from '../../directives/ad-host.directive';
import {NotificationComponent} from '../../components/notification-component/notification.component';
import {INotification, NotificationType} from './notification.service.interface';

/**
 * Сервис по работе с уведомлениями
 */
@Injectable({providedIn: 'root'})
export class NotificationService {
	/**
	 * Конструктор
	 * @param componentFactoryResolver Фабрика компонентов
	 */
	constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

	/**
	 * Сервис уведомлений
	 */
	private _notifications: {
		Notification: INotification,
		Host: ComponentRef<NotificationComponent>,
		Index: number
	}[] = [];

	/**
	 * Хост куда будет выводиться сообщение
	 */
	public hostContainer: AdHostDirective;

	/**
	 * Создать сообщение для уведомления из исключения об ошибке
	 * @param error Исключение
	 * @param title Заголово ошибки
	 */
	public static createErrorNotification(error: any, title: string): INotification {
		const errorNotification: INotification = {
			type: NotificationType.Error,
			notification: {message: '', messageCode: '', title}
		};

		if (error.error instanceof Error) {
			errorNotification.notification.message = error.error.message;
		} else {
			const errorMessageBody	= error.status === 0 ? error.message : error.error;

			errorNotification.notification.messageCode	= `${error.status}`;
			errorNotification.notification.message		= `${errorMessageBody}`;
		}

		return  errorNotification;
	}

	/**
	 * Создать сообщение для уведомления из заголовка, текста сообщения и типа сообщения
	 * @param title Заголово
	 * @param message Текст сообщения
	 * @param notificationType Тип уведомления
	 */
	public static createNotification(title: string, message: string, notificationType: NotificationType): INotification {
		return  {
			type: notificationType,
			notification: {message, messageCode: '', title}
		};
	}

	/**
	 * Добавить сообщение
	 * @param notification Сообщение
	 */
	public AddNotification(notification: INotification): void {
		if (this.hostContainer !== undefined) {
			const componentFactory	= this.componentFactoryResolver.resolveComponentFactory(NotificationComponent);
			const componentRef		= this.hostContainer.viewContainerRef.createComponent(componentFactory);

			const notificationIndex							= this._notifications.length;
			componentRef.instance.notificationIndex	= notificationIndex;
			componentRef.instance.notification			= notification;
			componentRef.instance.closeComponent.subscribe(index => this.RemoveNotification(index));
			this._notifications.push({Notification: notification, Host: componentRef, Index: notificationIndex});
		}
	}

	/**
	 * Удалить уведомление
	 * @param index Порядковый номер уведомления
	 */
	public RemoveNotification(index): void {
		for (const component of this._notifications) {
			if (component.Index === index) {
				component.Index	= -1;
				component.Host.destroy();
			}
			if (component.Index > index) {
				component.Index--;
				component.Host.instance.notificationIndex--;
			}
		}

		this._notifications	= this._notifications.filter((component) => component.Index !== -1);
	}
}

