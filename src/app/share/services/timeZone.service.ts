import {Injectable} from '@angular/core';


@Injectable({providedIn: 'root'})
export class TimeZoneService {
	public get TimeZone(): number {
		return new Date().getTimezoneOffset() / -60;
	}
}
