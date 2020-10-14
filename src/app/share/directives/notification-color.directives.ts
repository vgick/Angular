import {Directive, HostBinding, Input, OnInit} from '@angular/core';
import {NotificationType} from '../services/notification-service/notification.service.interface';

@Directive({
	selector: '[appNotificationColor]'
})
export class NotificationColorDirective implements OnInit{
	@Input('appNotificationColor') notificationType: NotificationType = null;
	@HostBinding('style.background-color') backgroundColor = null;
	@HostBinding('style.color') fontColor = null;

	ngOnInit(): void {
		switch (this.notificationType) {
			case NotificationType.Error:
				this.backgroundColor	= 'red';
				this.fontColor			= 'white';
				break;
			case NotificationType.Info:
				this.backgroundColor	= 'dodgerblue';
				this.fontColor			= 'white';
				break;
			case NotificationType.Warning:
				this.backgroundColor	= 'rgba(255, 255, 0, 0.50)';
				this.fontColor			= 'black';
				break;
			case NotificationType.Message:
				this.backgroundColor	= 'lightgrey';
				this.fontColor			= 'black';
				break;
			default:
				this.backgroundColor	= 'green';
				break;
		}

	}
}
