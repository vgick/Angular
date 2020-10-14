import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {INotification, NotificationType} from '../../services/notification-service/notification.service.interface';


@Component({
	selector: 'app-message-details',
	templateUrl: 'message-details.component.html',
	styleUrls: ['message-details.component.css']
})
export class MessageDetailsComponent {
	public not: INotification	= {notification: {title: '', message: '', messageCode: ''}, type: NotificationType.Info};

	constructor(@Inject(MAT_DIALOG_DATA) public notification: { notification: INotification }) {
		this.not	= notification.notification;
		console.log(this.not.type);
	}
}
