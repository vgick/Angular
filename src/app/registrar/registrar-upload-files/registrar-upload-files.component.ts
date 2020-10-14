import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {RegistrarFileService} from '../../share/services/registrar-file.service';

import {MatSnackBar} from '@angular/material/snack-bar';
import {TimeZoneService} from '../../share/services/timeZone.service';
import {NotificationService} from '../../share/services/notification-service/notification.service';

@Component({
	selector: 'app-registrar-upload-files',
	templateUrl: 'registrar-upload-files.component.html',
	styleUrls: ['registrar-upload-files.component.css']
})

export class RegistrarUploadFilesComponent {
	/**
	 * Конструктор
	 * @param registrarFileService сервис загрузки файлов на сервер
	 * @param snackBar Панель уведомлений
	 * @param timeZone Сервис для работы с часовым поясом
	 * @param notificationService Сервис уведомлений
	 */
	constructor(
		private registrarFileService: RegistrarFileService,
		private snackBar: MatSnackBar,
		private timeZone: TimeZoneService,
		private notificationService: NotificationService)
	{ }

	/**
	 * Элемент выбора файлов для загрузки на сервер.
	 */
	@ViewChild('fileInput')
	private _fileInput: ElementRef;

	/**
	 * Кнопка не доступна
	 */
	@Input()
	public Disabled = true;

	/**
	 * Код документа
	 */
	@Input()
	public idFileDescription: number;

	/**
	 * Код клиента
	 */
	@Input()
	public client1CCode: string;

	/**
	 * Номер договора
	 */
	@Input()
	public account1CCode: string;

	/**
	 * Событие после успешной загрузки файла на сервер
	 */
	@Output()
	public uploaded: EventEmitter<void> = new EventEmitter<void>();

	/**
	 * Идет загрузка файлов на сервер
	 */
	public uploading = false;

	/**
	 * Открыть диалоговое окно загрузки файлов
	 */
	onClick(): void {
		const fileInput	= this._fileInput.nativeElement;
		fileInput.click();
	}

	/**
	 * Заполнить данные для отправки на сервер
	 */
	getFormData(): FormData {
		const files		= this._fileInput.nativeElement.files;
		const formData	= new FormData();

		for (const file of files) {
			formData.append('files', file);
		}

		formData.append('idFileDescription', this.idFileDescription.toString());
		formData.append('client1CCode', this.client1CCode);
		formData.append('account1CCode', this.account1CCode);
		formData.append('clientTimeZone', this.timeZone.TimeZone.toString());

		return  formData;
	}

	/**
	 * Загрузить файлы на сервер
	 */
	upload(): void {
		this.uploading	= true;

		const formData	= this.getFormData();

		this.registrarFileService.upload(formData).
			subscribe(() => {
				this.snackBar.open('Файл успешно загружен на сервер', 'Закрыть');
				this.uploading	= false;
				this._fileInput.nativeElement.value = '';
				this.uploaded.emit();
			},
			error => {
				this.snackBar.open('Ошибка при загрузке файла на сервер', 'Закрыть');
				this.uploading	= false;
				this._fileInput.nativeElement.value = '';
				this.notificationService.AddNotification(
					NotificationService.createErrorNotification(error, 'Ошибка загрузки файла на сервер')
				);
			}
		);
	}
}
