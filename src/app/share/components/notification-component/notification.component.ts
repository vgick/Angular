import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {transition, trigger, useAnimation} from '@angular/animations';
import {bounceInRight, bounceOutRight} from 'ng-animate';
import {INotification, NotificationType} from '../../services/notification-service/notification.service.interface';
import {MatDialog} from '@angular/material/dialog';
import {MessageDetailsComponent} from './message-details.component';

@Component({
	selector: 'app-notification',
	templateUrl: 'notification.component.html',
	styleUrls: ['notification.component.css'],
	animations: [
		trigger('bounce', [
			transition('void => *', useAnimation(bounceInRight,
			{params: { timing: 2.5 }}
			)),
			transition('* => void', useAnimation(bounceOutRight,
				{params: { timing: 1 }}
			))
		])
	],
})

export class NotificationComponent implements AfterViewInit {
	constructor(public dialog: MatDialog) { }

	/**
	 * Высота уведомления
	 */
	private static notificationHeight	= 85;

	/**
	 * Отступ снизу
	 */
	private static marginBottom	= 5;


	/**
	 * Сообщение длянное, необходимо вывести развернутую версию.
	 */
	public messageIsLong	= false;

	/**
	 * Анимация
	 */
	bounce: any;

	@ViewChild('messageText')
	messageText: ElementRef;

	/**
	 * Скрыть элемент для анимации
	 */
	public visibleNotification	= true;

	@Output()
	public closeComponent: EventEmitter<number>	= new EventEmitter<number>();

	/**
	 * Сообщение
	 */
	public notification: INotification = { notification: { message: 'Не задано', title: 'Заголовок'}, type: NotificationType.Warning};

	/**
	 * Расположение уведомления
	 */
	public get bottom(): number {
		return NotificationComponent.notificationHeight * this.notificationIndex + NotificationComponent.marginBottom;
	}

	/**
	 * Номер уведомления в порядке вывода
	 */
	public notificationIndex = 0;

	/**
	 * Закрыть уведомление
	 */
	public closeNotification(): void {
		this.visibleNotification	= false;
		setTimeout(() => this.closeComponent.emit(this.notificationIndex), 500);
	}

	/**
	 * Вывести полное оипсание сообщения
	 */
	public openMessageDetails(): void {

	}

	/**
	 * Опредеяем на сколько большой текст сообщения
	 * Без таймаута, будут ошибки
	 * https://blog.angular-university.io/angular-debugging/
	 */
	ngAfterViewInit(): void {
		setTimeout(
			() => this.messageIsLong = this.messageText.nativeElement.offsetWidth < this.messageText.nativeElement.scrollWidth,
			0
		);
	}

	/**
	 * Открыть окно с полным сообщением
	 */
	public openDetails(): void {
		// console.log(this.notification);
		this.dialog.open(MessageDetailsComponent, { data: { notification: this.notification } } );
		// const dialogRef = this.dialog.open(
		// 	MessageDetailsComponent,
		// 	{ data: {
		// 			title: this.notification.notification.title,
		// 			message: this.notification.notification.message
		// 		}
		// 	}
		// );
	}
}

