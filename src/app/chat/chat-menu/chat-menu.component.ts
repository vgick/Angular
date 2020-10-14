import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterEvent} from '@angular/router';
import {ClientInAccountService} from '../../share/services/client-in-account.service';
import {filter, map, take} from 'rxjs/operators';


@Component({
	selector: 'app-chat-menu',
	templateUrl: 'chat-menu.component.html',
	styleUrls: ['chat-menu.component.css']
})

export class ChatMenuComponent implements OnInit, OnDestroy{

	/**
	 * Конструктор
	 * @param clientInAccountService Сервис со списком клиентов
	 * @param route Активный путь
	 * @param router Роутер
	 */
	constructor(private clientInAccountService: ClientInAccountService, private route: ActivatedRoute, private router: Router) { }

	/**
	 * Заголовок меню
	 */
	public menuTitle = 'Договор не выбран';

	/**
	 * Заголовок основного окна
	 */
	public cardTitle = 'Договор не выбран';

	/**
	 * Подзаголово основного окна
	 */
	public subTitle	= '';

	/**
	 * Номер выбранного договора
	 */
	public account1CCode = '';


	/**
	 * Меню открыто
	 */
	public menuOpened = false;

	/**
	 * Подписка на параметры при навигации
	 */
	private _router;

	/**
	 * Инициализая компонента
	 */
	ngOnInit(): void {
		this.subscribeNavigate();
		if (this.route.firstChild !== null) { this.urlOpenDirect(); }

		this.clientInAccountService.owner.subscribe(owner => {
			console.log(owner);
			this.menuTitle = owner === undefined ? 'Договор не выбран' : `${owner.lastName} ${owner.firstName}`;
			this.cardTitle = owner === undefined ? 'Договор не выбран' : `${owner.lastName} ${owner.firstName} ${owner.secondName}`;
		});
	}

	/**
	 * Удаление компонента
	 */
	ngOnDestroy(): void {
		this._router.unsubscribe();
	}

	/**
	 * Подписка на параметр при открытии по прямой ссылке
	 */
	private urlOpenDirect(): void {
		this.route.firstChild.params.pipe(
			take(1)
		).
		subscribe(
			(params) => {
				this.subTitle			= params.account1CCode === undefined ? '' : `договор ${params.account1CCode}`;
				this.account1CCode	= params.account1CCode === undefined ? '' : params.account1CCode;
			}
		);
	}

	/**
	 * Подписка на смену параметра при навигации
	 */
	private subscribeNavigate(): void {
		this._router	= this.router.events.
			pipe(
				filter((event: RouterEvent) => event instanceof NavigationEnd),
				map(() => this.route),
				map((route: ActivatedRoute) => {
					while (route.firstChild) {
						route = route.firstChild;
					}
					return route;
				})
			)
			.subscribe((route) => {
				route.params.subscribe(params => {
					this.subTitle			= params.account1CCode === undefined ? '' : `договор ${params.account1CCode}`;
					this.account1CCode	= params.account1CCode;
				});
			});
	}
}
