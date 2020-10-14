import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs/operators';

export interface IClient {
	code1C: string;
	firstName: string;
	secondName: string;
	lastName: string;
	birthDate: Date;
	affiliationOfAccount: AffiliationOfAccount;
}

/**
 * Принадлежность клиента к счету
 */
export enum AffiliationOfAccount {
	// noinspection NonAsciiCharacters
	'Основной заемщик',
	'Поручитель'
}

@Injectable({providedIn: 'root'})
export class ClientInAccountService {
	/**
	 * Адрес сервиса
	 */
	private url = environment.clientInAccountServiceURL;

	/**
	 * Владелец счета
	 */
	public owner: BehaviorSubject<IClient>	= new BehaviorSubject<IClient>(undefined);

	/**
	 * Конструктор
	 * @param httpClient HTTPClient
	 */
	constructor(private httpClient: HttpClient) { }

	/**
	 * Получить основного заемщика
	 * @param clients Список клиентов
	 */
	static Owner(clients: IClient[]): IClient {
		let owner: IClient	= null;

		clients.forEach(client => {
			if (client.affiliationOfAccount === AffiliationOfAccount['Основной заемщик']) {
				owner = client;
				return;
			}
		});

		return owner;
	}

	/**
	 * Получить список контрагентов в договоре
	 * @param account Номер договора
	 * @param region Регион пользователя
	 */
	public GetClients(account: string, region: string): Observable<IClient[]> {
		const params	= new HttpParams().set('account', account).append('region', region);
		const clients$	= this.httpClient.get<IClient[]>(this.url, { params });

		return clients$.pipe(
			tap((clients) => {
				const owner	= ClientInAccountService.Owner(clients);
				this.owner.next(owner);
			})
		);
	}
}
