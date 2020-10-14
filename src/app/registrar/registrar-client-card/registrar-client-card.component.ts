import { Component, Input, OnInit, } from '@angular/core';
import {AffiliationOfAccount, IClient} from '../../share/services/client-in-account.service';
import {RegistrarDocument, RegistrarDocumentsService} from '../../share/services/registrar-documents-service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NotificationService} from '../../share/services/notification-service/notification.service';

@Component({
	selector: 'app-registrar-client-card',
	templateUrl: 'registrar-client-card.component.html',
	styleUrls: ['registrar-client-card.component.css']
})
export class RegistrarClientCardComponent implements OnInit {
	/**
	 * Конструктор
	 * @param registrarDocumentsService Сервис для работы с документами
	 * @param snackBar Всплывающие уведомления
	 * @param notificationService Сервис уведомлений
	 */
	constructor(
		private registrarDocumentsService: RegistrarDocumentsService,
		private snackBar: MatSnackBar,
		private notificationService: NotificationService)
	{ }

	/**
	 * Клиент для которого отображается карточка файлов
	 */
	@Input()
	public client: IClient;

	/**
	 * Договор 1С
	 */
	@Input()
	public account1CCode: string;

	/**
	 * Идет загрузка данных с сервера
	 */
	public loadingData = false;

	/**
	 * Список всех документов
	 */
	public registrarDocuments: RegistrarDocument[];

	/**
	 * Инициализация компонента
	 */
	ngOnInit(): void {
		this.loadingData	= true;
		this.registrarDocumentsService.registrarDocuments(this.account1CCode, this.client.code1C).
			subscribe(documents => {
				this.loadingData			= false;
				this.registrarDocuments	= documents;
				this.snackBar.open(`Загружены документы ${this.fio}`, 'закрыть', { duration: 2000 });
			},
			error => {
				this.loadingData			= false;
				this.notificationService.AddNotification(
					NotificationService.createErrorNotification(error, `Ошибка получения списка документов контрагента ${this.fio}`)
				);
			}
		);
	}

	/**
	 * Принадлежность клиента к счету
	 */
	public getAffiliationString(): string{
		return AffiliationOfAccount[this.client.affiliationOfAccount];
	}

	/**
	 * Полное ФИО клиента
	 */
	public get fio(): string {
		return `${this.client.lastName} ${this.client.firstName} ${this.client.secondName}`;
	}
}
