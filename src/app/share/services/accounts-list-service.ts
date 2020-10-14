import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RegionService} from './region-service';
import {environment} from '../../../environments/environment';

export enum AccountStatus {
	// noinspection NonAsciiCharacters
	'Действующий',
	'Закрыт',
	'Новый',
	'На проверке СБ',
	'На верификации',
	'Подписание договора клиентом'
}

/**
 * Описание счетов
 */
export interface IAccountLegend {
	/**
	 * Номер договора
	 */
	doc_number: string;
	/**
	 * Дата договора
	 */
	doc_date: string;
	/**
	 * Вид счета (Партнерский...)
	 */
	doc_type: string;
	/**
	 * Код организации
	 */
	organization_code: string;
	/**
	 * Наименование организиции
	 */
	organization_name: string;
	/**
	 * Город где была заключена сделка
	 */
	city: string;
	/**
	 * ФИО клиента
	 */
	fio: string;
	/**
	 * Текущий статус договора
	 */
	doc_status: string;
	/**
	 * Дата выставления статуса
	 */
	date_status: string;
	/**
	 * Дата выставления статуса - действующий
	 */
	date_status_acting: string;
	/**
	 * Дата закрытия договора
	 */
	date_status_closed: string;
}

/**
 * Список счетов и возможные ошибки при выполнении запроса
 */
export interface IAccountLegendNResult {
	accountLegends: IAccountLegend[];
	errors: string[];
}


/**
 * Сервис для работы с списком договоров
 */
@Injectable({providedIn: 'root'})
export class AccountsListService {
	/**
	 * Адрес сервиса
	 */
	// // private static url = 'https://stock.vega.lazer/api/accountsListAPI';
	// private url = 'http://localhost:5000/api/accountsListAPI';
	// // accountsListServiceURL: 'https://stock.vega.lazer/api/accountsListAPI';
	private url = environment.accountsListServiceURL;

	/**
	 * Конструктор
	 * @param httpClient http сервис
	 * @param regionService Регион пользователя
	 */
	constructor(private httpClient: HttpClient, private regionService: RegionService) { }

	getAccountList(status: AccountStatus[]): Observable<IAccountLegendNResult>{
		let requestParams = new HttpParams().set('region', this.regionService.currentRegion.getValue());
		status.forEach(i => requestParams = requestParams.append('accountStatus', i.toString()));

		return this.httpClient.get<IAccountLegendNResult>(this.url, {params: requestParams});
	}

}
