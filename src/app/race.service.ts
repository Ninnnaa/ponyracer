import { Injectable } from '@angular/core';
import { Observable, of ,interval} from 'rxjs';
import { delay, take, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { RaceModel } from './models/race.model';
import { PonyWithPositionModel } from './models/pony.model';




@Injectable({
    providedIn: 'root'
})
export class RaceService {
    constructor(private http: HttpClient) {}
    list(): Observable<Array<RaceModel>> {
        return this.http.get<Array<RaceModel>>(`${environment.baseUrl}/api/races`);
    }

    bet(raceId: number, ponyId: number): Observable<RaceModel> {
        return this.http.post<RaceModel>(`${environment.baseUrl}/api/races/${raceId}/bets`, { ponyId });
    }
    get(raceId: number): Observable<RaceModel> {
        return this.http.get<RaceModel>(`${environment.baseUrl}/api/races/${raceId}`);
    }
    cancelBet(raceId: number): Observable<void> {
        return this.http.delete<void>(`${environment.baseUrl}/api/races/${raceId}/bets`);
    }
    live(raceId: number): Observable<Array<PonyWithPositionModel>>{
        return interval(200).pipe(take(101), map(position => {
            return [{
                id: 1,
                name: 'Superb Runner',
                color: 'BLUE',
                position
            }, {
                id: 2,
                name: 'Awesome Fridge',
                color: 'GREEN',
                position
            }, {
                id: 3,
                name: 'Great Bottle',
                color: 'ORANGE',
                position
            }, {
                id: 4,
                name: 'Little Flower',
                color: 'YELLOW',
                position
            }, {
                id: 5,
                name: 'Nice Rock',
                color: 'PURPLE',
                position
            }];
        }));
    }
}
