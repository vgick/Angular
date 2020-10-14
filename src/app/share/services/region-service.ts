import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {shareReplay} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

/**
 * Сервис по работе со списком регионов
 */
@Injectable({providedIn : 'root'})
export class RegionService {
	/**
	 * Ключ выбранного региона в кукисах
	 */
	private static currentRegionInCookies = 'currentRegion';

	/**
	 * Адрес сервиса
	 */
	// // private static url = 'https://stock.vega.lazer/api/regionAPI/';
	// // private static url = 'http://localhost:5000/api/regionAPI/';
	// regionServiceURL: 'https://stock.vega.lazer/api/regionAPI/';
	private  url = environment.regionServiceURL;

	/**
	 * Выбранный регион
	 */
	public currentRegion: BehaviorSubject<string>;

	private tmpRegionListSubscription: Subscription;

	/**
	 * Конструктор
	 * @param httpClient HTTP клиент для запросов
	 */
	constructor(private httpClient: HttpClient) {
		this.currentRegion = new BehaviorSubject<string>('');
		let region;
		if (localStorage.getItem(RegionService.currentRegionInCookies) !== null) {
			region	= localStorage.getItem(RegionService.currentRegionInCookies);
		}
		else{
			this.tmpRegionListSubscription	= this.GetRegionsList().subscribe((newRegions) => {
				if (this.currentRegion.getValue() === undefined && newRegions.length > 0){
					this.currentRegion.next(newRegions[0]);
					this.tmpRegionListSubscription.unsubscribe();
				}
			});
		}

		this.currentRegion.next(region);
		this.currentRegion.subscribe((newRegion) => localStorage.setItem(RegionService.currentRegionInCookies, newRegion));
	}

	/**
	 * Получить список регионов
	 */
	GetRegionsList(): Observable<string[]> {
		return  this.httpClient.get<string[]>(this.url).pipe(shareReplay({bufferSize: 1, refCount: true}));
	}
}
