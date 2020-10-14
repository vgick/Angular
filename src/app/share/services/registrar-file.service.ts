import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({providedIn : 'root'})
export class RegistrarFileService {
	/**
	 * Адрес сервиса
	 */
	// private static url = 'https://stock.vega.lazer/api/registrarFileAPI/';
	// private url = 'http://localhost:5000/api/registrarFileAPI/';
	// // registrarFileServiceURL: 'https://stock.vega.lazer/api/registrarFileAPI/';
	private url = environment.registrarFileServiceURL;

	/**
	 * Конструктор
	 * @param httpClient http сервис
	 */
	constructor(private httpClient: HttpClient) { }

	/**
	 * Сохранить файл в архиве
	 * @param data Файды
	 */
	public upload(data): Observable<any> {
		return this.httpClient.post<any>(this.url, data);
	}

	/**
	 * Удалить файл из архива
	 * @param idFile ID файла
	 */
	public delete(idFile: number): Observable<any> {
		return this.httpClient.delete<any>(`${this.url}${idFile}`);
	}

	/**
	 * Ссылка на скачивание файла
	 * @param idFile ID файла
	 */
	public downloadURL(idFile: number): string {
		return `${this.url}${idFile}`;
	}
}

