import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import { environment } from '../environments/environment'
import {RaceModel} from './models/race.model';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  constructor(private http: HttpClient) {}
    list(): Observable<Array<RaceModel>>{
        return this.http.get<Array<RaceModel>>(`${environment.baseUrl}/api/races`);
    }
}
