import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

import { RaceModel } from './models/race.model';
import { RaceService } from './race.service';


@Injectable({
  providedIn: 'root'
})
export class RaceResolverResolver implements Resolve<RaceModel> {
    constructor(private raceService: RaceService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RaceModel> {
        const raceId = +route.paramMap.get('raceId');
        return this.raceService.get(raceId);
    }
}
