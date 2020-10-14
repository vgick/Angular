import {Component} from '@angular/core';

@Component({
	selector: 'app-top-nav-menu',
	templateUrl: 'top-nav-menu.component.html',
	styleUrls: ['top-nav-menu.component.css']
})

/**
 * Верхнее меню
 */
export class TopNavMenuComponent {
	isExpanded = false;

	collapse(): void {
		this.isExpanded = false;
	}

	toggle(): void {
		this.isExpanded = !this.isExpanded;
	}
}
