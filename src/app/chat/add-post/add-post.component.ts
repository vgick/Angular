import { Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {PostsService} from '../../share/services/posts.service';

@Component({
	selector: 'app-add-post',
	templateUrl: 'add-post.component.html',
	styleUrls: ['add-post.component.css']
})

export class AddPostComponent {

	/**
	 * Конструктор
	 * @param postsService Сервис по работе с сообщениями
	 */
	constructor(private postsService: PostsService) { }

	/**
	 * Поле ввода сообщения
	 */
	@ViewChild('message', {static: true})
	private _textArea: ElementRef;

	/**
	 * Вызвать
	 */
	@Output()
	public addMessageEvent: EventEmitter<void>	= new EventEmitter<void>();

	/**
	 * Выбранный договор
	 */
	@Input()
	public account1CCode: string;

	/**
	 * Добавить сообщение
	 */
	public addMessage(): void {
		const message	= this._textArea.nativeElement.value;

		this.postsService.AddPost(this.account1CCode, message).subscribe(() => {
			this._textArea.nativeElement.value	= '';
		});
	}

	/**
	 * Доступность кнопки "отправить"
	 */
	public get sendButtonDisable(): boolean {
		return this._textArea.nativeElement.value.length === 0 || this.account1CCode === '';
	}

}
