/**
 * Типы уведомлений
 */
export enum NotificationType {
	Error,
	Warning,
	Info,
	Message
}

/**
 * Интерфейс сообщения об ошибке
 */
export interface INotificationMessage {
	title: string;
	message: string;
	messageCode?: string;
}

/**
 * Интерфейс уведомления
 */
export interface INotification {
	notification: INotificationMessage;
	type: NotificationType;
}
