import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

export interface IMenuItem {
	Route: string;
	Label: string;
	Disabled: boolean;
}

@Component({
	selector: 'app-side-nav-menu',
	templateUrl: 'side-nav-menu.component.html',
	styleUrls: ['side-nav-menu.component.css']
})
export class SideNavMenuComponent implements OnInit, OnDestroy {
	/**
	 * Конструктор
	 * @param route Активный путь
	 * @param router Наыигация
	 */
	constructor(private route: ActivatedRoute, private router: Router) { }

	/**
	 * Текущий путь
	 */
	public currentURL: string[];

	/**
	 * Пункты меню
	 */
	@Input()
	public menuItems: IMenuItem[];

	/**
	 * Подписка на смену пути
	 */
	private _url;

	/**
	 * Инициализация
	 */
	ngOnInit(): void {
		this._url	= this.route.root.firstChild.url.subscribe(url => this.currentURL = [url[0].path]);
	}

	/**
	 * Удаление компонента
	 */
	ngOnDestroy(): void {
		this._url.unsubscribe();
	}
}

