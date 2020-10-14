import {Component, Input} from '@angular/core';
import {IPost} from '../../share/services/posts.service';


@Component({
	selector: 'app-post',
	templateUrl: 'post.component.html',
	styleUrls: ['post.component.css']
})

export class PostComponent {
	/**
	 * Сообщение
	 */
	@Input()
	public post: IPost;

	/**
	 * Заголовок сообщения
	 */
	public title(): string {
		return `${this.post.author} ${this.post.date}`;
	}
}
