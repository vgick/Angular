import {Component, OnInit} from '@angular/core';
import {RegionService} from '../../services/region-service';

/**
 * Компонент для отображения/выбора текущего региона
 */
@Component({
	selector: 'app-region-selector',
	templateUrl: 'region-selector.component.html'
	})
export class RegionSelectorComponent implements OnInit {
	/**
	 * Конструктор
	 * @param regionService сервис для работы с регионами
	 */
	constructor(public regionService: RegionService) { }

	/**
	 * Выбранный регион, для использования в компоненте
	 */
	private _currentRegion: string;

	/**
	 * Список регионов, для использования в компоненте
	 */
	private _regionList: string[];

	/**
	 * Получить список реионов, для использования в шаблоне компонента
	 */
	get regionList(): string[]{
		return this._regionList;
	}

	/**
	 * Получить текущий регион, для использования в шаблоне
	 */
	get currentRegion(): string {
		return  this._currentRegion;
	}

	/**
	 * Поменять текущий регион, для использования в шаблоне
	 * @param value Новый регион
	 */
	set currentRegion(value) {
		this._currentRegion	= value;
		this.regionService.currentRegion.next(value);
	}

	/**
	 * Инициализация компонента
	 */
	ngOnInit(): void {
		this.regionService.currentRegion.subscribe((region) => {
			if (this.currentRegion !== region) { this._currentRegion = region; }
		});

		this.regionService.GetRegionsList().subscribe(regions => {
			this._regionList = regions;
		});
	}
}
