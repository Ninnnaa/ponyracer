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
export class RacesResolver implements Resolve<Array<RaceModel>> {
    constructor(private raceService: RaceService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<RaceModel>> {
        const status = route.routeConfig.path.toUpperCase() as 'PENDING' | 'RUNNING' | 'FINISHED';
        return this.raceService.list(status);
    }
}
