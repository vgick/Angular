import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

export interface RegistrarFile {
	/**
	 * Ключ записи в БД
	 */
	id: number;
	/**
	 * Имя файла
	 */
	fileName: string;
	/**
	 * Кто загрузил файл
	 */
	authorName: string[];
	/**
	 * Дата загрузки файла
	 */
	uploadDate: Date;
}

export interface RegistrarDocument {
	/**
	 * ID описания
	 */
	id: number;
	/**
	 * Описание файла
	 */
	fileDescription: string;
	/**
	 * Имена сохраненных файлов
	 */
	files: RegistrarFile[];
	/**
	 * Разрешено добавление документа
	 */
	writeAccess: boolean;
}

@Injectable({providedIn : 'root'})
export class RegistrarDocumentsService {
	// // private url	= 'https://stock.vega.lazer/api/registrarDocumentsAPI';
	// private url	= 'http://localhost:5000/api/registrarDocumentsAPI';
	// // registrarDocumentsServiceURL: 'https://stock.vega.lazer/api/registrarDocumentsAPI';
	private url	= environment.registrarDocumentsServiceURL;

	/**
	 * Конструктор
	 * @param httpClient http клиент
	 */
	constructor(private httpClient: HttpClient) { }

	/**
	 * Получить список документов и файлов по договору и клиенту
	 * @param account1CCode Номер договора
	 * @param client1CCode Код клиента
	 */
	public registrarDocuments(account1CCode: string, client1CCode: string): Observable<RegistrarDocument[]> {
		return this.httpClient.get<RegistrarDocument[]>(this.url + `/${account1CCode}/${client1CCode}`);
	}

	public registrarDocument(account1CCode: string, client1CCode: string, documentID: number): Observable<RegistrarDocument> {
		return this.httpClient.get<RegistrarDocument>(this.url + `/${account1CCode}/${client1CCode}/${documentID}`);
	}
}
