import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CurrentAccountService} from '../../services/current-account.service';
import {ActivatedRoute, NavigationEnd, Router, RouterEvent} from '@angular/router';
import {filter, map, take} from 'rxjs/operators';

@Component({
	selector: 'app-select-account',
	templateUrl: './select-account.component.html',
	styleUrls: ['select-account.component.css']
})

/**
 * Компонент для выбора договора
 */
export class SelectAccountComponent implements OnInit, OnDestroy {
	/**
	 * Конструктор
	 * @param accountService Текущее значение
	 * @param router Маршрут
	 * @param activeRoute Активный маршрут
	 */
	constructor(private accountService: CurrentAccountService, private router: Router, private activeRoute: ActivatedRoute) { }

	/**
	 * Маршрут для навигации
	 */
	@Input()
	public route: string;

	/**
	 * Подписка на параметры при навигации
	 */
	private _paramsSubscription;

	/**
	 * Выбранный договор
	 */
	public account1CCode: string;

	/**
	 * Инициализация компонента
	 */
	ngOnInit(): void {
		this.subscribeNavigate();
		if (this.activeRoute.firstChild !== null) { this.subscribeDirectUrl(); }
	}

	/**
	 * Удаление компонента
	 */
	ngOnDestroy(): void {
		this._paramsSubscription.unsubscribe();
	}

	/**
	 * Подписка на параметр при открытии по прямой ссылке
	 */
	private subscribeDirectUrl(): void {
		this.activeRoute.firstChild.params.pipe(
			take(1)
		).
		subscribe(
			(params) => {
				this.account1CCode	= params.account1CCode === undefined ? '' : params.account1CCode;
			}
		);
	}

	/**
	 * Подписка на смену параметра при навигации
	 */
	private subscribeNavigate(): void {
		this._paramsSubscription	= this.router.events.
			pipe(
				filter((event: RouterEvent) => event instanceof NavigationEnd),
				map(() => this.activeRoute),
				map((route: ActivatedRoute) => {
					while (route.firstChild) {
						route = route.firstChild;
					}
					return route;
				})
			)
			.subscribe((route) => {
				route.params.subscribe(params => {
					this.account1CCode	= params.account1CCode;
				});
			});
	}

	/**
	 * Обработчик выбора договора
	 */
	setAccountNumber(): void {
		this.router.navigate([this.route, this.account1CCode]);
	}
}
