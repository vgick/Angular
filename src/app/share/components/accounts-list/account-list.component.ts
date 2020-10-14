import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AccountsListService, AccountStatus, IAccountLegendNResult} from '../../services/accounts-list-service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatAccordion} from '@angular/material/expansion';
import {Router} from '@angular/router';

/**
 * Компонент для отображения списка договоров
 */
@Component({
	selector: 'app-accounts-list',
	templateUrl: 'account-list.component.html',
	styleUrls: ['account-list.component.css']
})
export class AccountListComponent implements OnDestroy, OnInit {
	/**
	 * Конструктор
	 * @param accountsListService Сервис списка договоров
	 * @param router Роутер
	 */
	constructor( private accountsListService: AccountsListService, private router: Router) { }

	/**
	 * Список статусов договоров, которые необходимо отобразить
	 */
	accountstatuses: AccountStatus[] = [
		AccountStatus['На верификации'],
		AccountStatus['На проверке СБ'],
		AccountStatus.Новый,
		AccountStatus['Подписание договора клиентом']
	];

	/**
	 * Список договоров
	 */
	private data: IAccountLegendNResult;

	/**
	 * Данные для таблицы
	 */
	public dataSource;

	/**
	 * Сортировка
	 */
	@ViewChild(MatSort, {static: true})
	sort: MatSort;

	/**
	 * Сворачивающийся список договоров
	 */
	@ViewChild(MatAccordion)
	public accordion: MatAccordion;

	/**
	 * Базовый маршур по которому отображается список договоров
	 * для последующего подставления номера договора
	 */
	@Input()
	public route	= '';

	/**
	 * Отображаемые в таблице колонки
	 */
	public displayedColumns: string[] = ['doc_number', 'doc_date', 'fio', 'organization_name', 'doc_status', 'load'];

	/**
	 * Идет обновление компонента
	 */
	updating = false;

	/**
	 * Таймер для обновления списка оговоров
	 */
	private timer;

	/**
	 * Инициализация
	 */
	ngOnInit(): void {
		this.updateList();
		this.timer = setInterval(() => this.updateList(), 15000);
	}

	/**
	 * Закрытие формы
	 */
	ngOnDestroy(): void {
		clearInterval(this.timer);
	}

	/**
	 * Обновить список договоров
	 */
	public updateList(): void {
		if (this.updating) { return; }
		this.updating = true;

		this.accountsListService.getAccountList(this.accountstatuses).subscribe(
			i => {
				this.updating = false;
				this.data = i;
				this.dataSource		= new MatTableDataSource(this.data.accountLegends);
				this.dataSource.sort	= this.sort;
			},
			() => {
				this.updating = false;
			});
	}

	/**
	 * Загрузить данные по договору
	 * @param docNumber Номер договора для загрузки данных
	 */
	public load(docNumber: string): void {
		this.router.navigate([this.route, docNumber]);
		this.accordion.closeAll();
	}
}
