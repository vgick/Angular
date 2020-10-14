import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {IMenuItem} from '../../share/components/side-nav-menu/side-nav-menu.component';
import {Title} from '@angular/platform-browser';
import {CurrentAccountService} from '../../share/services/current-account.service';

@Component({
	selector: 'app-registrar-documents',
	templateUrl: 'registrar-documents.component.html',
	styleUrls: ['registrar-documents.component.css'],
	providers: [
		CurrentAccountService
	]
})
export class RegistrarDocumentsComponent implements OnInit {
	/**
	 * Конструктор
	 * @param titleService Сервис для работы с заголовокм браузера
	 */
	constructor(private titleService: Title) { }

	/**
	 * Заголовок окна
	 */
	public title = 'Архив документов';

	/**
	 * Номер договора
	 */
	public account1CCode: string;

	/**
	 * Контейнер для отображения информации об ошибке
	 */
	@ViewChild('errorContainer', { read: ViewContainerRef })
	errorContainer: ViewContainerRef;

	/**
	 * Меню
	 */
	public navMenu: IMenuItem[] = [
		{Route: 'registrar', Label: 'Архив', Disabled: false},
		{Route: 'headerReport', Label: 'Отчет руководителя', Disabled: true}
	];

	/**
	 * Инициализация компонента
	 */
	ngOnInit(): void {
		this.titleService.setTitle(this.title);
	}
}
