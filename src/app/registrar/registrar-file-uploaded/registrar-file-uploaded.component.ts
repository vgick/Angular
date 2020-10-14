import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {RegistrarDocument, RegistrarDocumentsService} from '../../share/services/registrar-documents-service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {RegistrarFileService} from '../../share/services/registrar-file.service';
import {NotificationService} from '../../share/services/notification-service/notification.service';


@Component({
	selector: 'app-registrar-file-uploaded',
	templateUrl: 'registrar-file-uploaded.component.html',
	styleUrls: ['registrar-file-uploaded.component.css']
})
export class RegistrarFileUploadedComponent implements OnInit {
	/**
	 * Конструктор
	 * @param registrarFileService Сервис по загрузке/выгрузке файлов архива
	 * @param registrarDocumentsService Сервис по работе с документами
	 * @param notificationService Сервис уведомлений
	 */
	constructor(
		private registrarFileService: RegistrarFileService,
		private registrarDocumentsService: RegistrarDocumentsService,
		private notificationService: NotificationService)
	{ }

	/**
	 * Документ
	 */
	@Input()
	public registrarDocument: RegistrarDocument;

	/**
	 * Номер договора
	 */
	@Input()
	public account1CCode: string;

	/**
	 * Код клиента
	 */
	@Input()
	public client1CCode: string;

	/**
	 * Данные для таблицы
	 */
	public dataSource;

	/**
	 * Отправлен запрос на сервер
	 */
	public requestToServer = false;

	/**
	 * Отображаемые в таблице колонки
	 */
	public displayedColumns: string[] = ['fileName', 'uploadDate', 'authorName', 'Download', 'Delete'];

	/**
	 * Сортировка таблицы
	 */
	@ViewChild(MatSort, {static: true})
	public sort: MatSort;

	/**
	 * Инициализация
	 */
	ngOnInit(): void {
		this.dataSource		= new MatTableDataSource(this.registrarDocument.files);
		this.dataSource.sort	= this.sort;
	}

	/**
	 * Нет файлов для отображения
	 */
	get noFiles(): boolean{
		return this.registrarDocument.files.length === 0;
	}

	/**
	 * Удалить файл
	 * @param id ID удаляемоего файла
	 */
	public deleteFile(id: number): void {
		this.registrarFileService.delete(id).
			subscribe(() => {
				this.updateForm();
			},
			error => {
				this.notificationService.AddNotification(
					NotificationService.createErrorNotification(error, 'Ошибка при удалении файла')
				);
			});
	}

	/**
	 * Ссылка на скачивание файла
	 * @param idFile ID файла
	 */
	public getFileURL(idFile: number): string {
		return this.registrarFileService.downloadURL(idFile);
	}

	/**
	 * Обновить список документов
	 */
	@Input()
	public updateForm(): void {
		this.registrarDocumentsService.registrarDocument(this.account1CCode, this.client1CCode, this.registrarDocument.id).
		subscribe(document => {
			this.registrarDocument	= document;
			this.dataSource			= new MatTableDataSource(this.registrarDocument.files);
			this.dataSource.sort		= this.sort;
		});
	}
}
