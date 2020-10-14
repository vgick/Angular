import {Component, Input, OnInit} from '@angular/core';
import {IUploadedFileInfo, PhotoService} from '../../share/services/photo.service';
import {RegistrarFileService} from '../../share/services/registrar-file.service';

@Component({
	selector: 'app-photo-list',
	templateUrl: 'photo-list.component.html',
	styleUrls: ['photo-list.component.css']
})
export class PhotoListComponent implements OnInit{
	/**
	 * Конструткор
	 * @param photoService Сервис по работе с фотографиями
	 * @param registrarFileService Сервис по работе с файлами архива
	 */
	constructor(private photoService: PhotoService, private registrarFileService: RegistrarFileService) {	}

	/**
	 * Код клиента
	 */
	@Input()
	public client1CCode: string;

	/**
	 * Исключить фотографии, загруженные по указанному договору
	 */
	@Input()
	public exclude: string;

	/**
	 * Список загруженных фотографий
	 */
	public files: IUploadedFileInfo[];

	/**
	 * Инициализация
	 */
	public ngOnInit(): void {
		this.photoService.getPgotoList(this.client1CCode, this.exclude).subscribe((files) => {
			this.files	= files;
		});
	}

	/**
	 * Получить ссылку для скачивания фотографии клиента
	 * @param id ID клиента
	 */
	public generatePhotoUrl(id: number): string {
		return this.registrarFileService.downloadURL(id);
	}
}
