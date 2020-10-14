import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {TimeZoneService} from './timeZone.service';
import {DatePipe} from '@angular/common';
import {tap} from 'rxjs/operators';

export interface IPost {
	account1CCode: string;
	author: string;
	date: Date;
	message: string;
}

@Injectable({providedIn: 'root'})
export  class PostsService {
	/**
	 *
	 * @param httpClient HTTP клиент
	 * @param timeZone Часовая зона
	 * @param datePipe Пайп даты
	 */
	constructor(private httpClient: HttpClient, private timeZone: TimeZoneService, private datePipe: DatePipe) { }

	/**
	 * Адрес сервиса
	 */
	private url = environment.postsServiceURL;

	/**
	 * Факт обновления ообщений
	 */
	public updateChat$: Subject<void>	= new Subject<void>();

	/**
	 * Получить сообщения по текущему договору
	 */
	public GetPosts(account1CCode: string): Observable<IPost[]> {
		const url	= `${this.url}/${account1CCode}`;
		return this.httpClient.get<IPost[]>(url);
	}


	/**
	 * Добавить сообщение
	 * @param account1CCode Сообщение для добавления
	 * @param message Сооббщение для отправления на ервер
	 */
	public AddPost(account1CCode: string, message: string): Observable<any> {
		const url	= `${this.url}/${account1CCode}`;
		const formData: FormData	= new FormData();

		formData.append('date', this.datePipe.transform(new Date(), 'yyyy-MM-dd'));
		formData.append('clientTimeZone', this.timeZone.TimeZone.toString());
		formData.append('message', message);

		const sendPost$	= this.httpClient.post<any>(url, formData);

		return sendPost$.pipe(
			tap(() => this.updateChat$.next())
		);
	}
}
