import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

import {RaceModel} from './models/race.model';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  list(): Observable<Array<RaceModel>>{
  return this.http.get<Array<RaceModel>>('https://ponyracer.ninja-squad.com/api/races');
  }
  constructor(private http: HttpClient) { }
}
