import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IPost, PostsService} from '../../share/services/posts.service';


@Component({
	selector: 'app-post-list',
	templateUrl: 'post-list.component.html',
	styleUrls: ['post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {
	/**
	 * Конструктор
	 * @param postsService Сервис для работы с сообщениями
	 */
	constructor(private postsService: PostsService) { }

	/**
	 * Список сообщений по выбранному договору
	 */
	public posts: IPost[];

	/**
	 * Номер выбранного договора
	 */
	private _account1CCode: string;

	/**
	 * Подписка на обновления сообщений
	 */
	private _updateChatSubscribe;

	/**
	 * Инициализация компонента
	 */
	ngOnInit(): void {
		this._updateChatSubscribe = this.postsService.updateChat$.subscribe(() => {
			if (this._account1CCode !== '') {
				this.postsService.GetPosts(this._account1CCode).subscribe((posts) => {
					this.posts = posts;
				});
			}
		});
	}

	/**
	 * Удаление компонента
	 */
	ngOnDestroy(): void {
		this._updateChatSubscribe.unsubscribe();
	}

	/**
	 * Установить номер договора
	 * @param value Новое значение
	 */
	@Input()
	public set account1CCode(value: string) {
		this._account1CCode	= value;

		if (this._account1CCode !== '') {
			this.postsService.GetPosts(this._account1CCode).subscribe((posts) => {
				this.posts = posts;
			});
		}
	}

	/**
	 * Получить номер договора
	 */
	public get account1CCode(): string {
		return this._account1CCode;
	}
}

