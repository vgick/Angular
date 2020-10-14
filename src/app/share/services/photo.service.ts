import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

/**
 * Информация о загруженном файле
 */
export interface IUploadedFileInfo {
	id: number;
	uploadDate: string;
}

@Injectable({providedIn: 'root'})
export class PhotoService {
	/**
	 * Адрес сервиса
	 */
	// // private static url = 'https://stock.vega.lazer/api/photoAPI';
	// private url = 'http://localhost:5000/api/photoAPI';
	// // photoServiceURL: 'https://stock.vega.lazer/api/photoAPI';
	private url = environment.photoServiceURL;

	/**
	 * Конструктор
	 * @param httpClient http сервис
	 */
	constructor(private httpClient: HttpClient) { }

	public getPgotoList(client1CCode: string, excludeAccount: string): Observable<IUploadedFileInfo[]> {
		const url	= `${this.url}/${client1CCode}/${excludeAccount}`;
		return this.httpClient.get<IUploadedFileInfo[]>(url);
	}
}
