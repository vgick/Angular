import {NgModule} from '@angular/core';
import {AddPostComponent} from './add-post/add-post.component';
import {ChatMenuComponent} from './chat-menu/chat-menu.component';
import {PostComponent} from './post/post.component';
import {PostsService} from '../share/services/posts.service';
import {ShareModule} from '../share/share.module';
import {PostListComponent} from './post-list/post-list.component';
import {DatePipe} from '@angular/common';


@NgModule({
	declarations: [
		AddPostComponent,
		ChatMenuComponent,
		PostComponent,
		PostListComponent,
	],
	imports: [
		ShareModule
	],
	exports: [
		ChatMenuComponent,
		PostComponent,

	],
	providers: [
		PostsService,
		DatePipe
	]
})
export class ChatModule { }
