import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RaceService } from '../race.service';
import { RaceModel } from '../models/race.model';
import {PonyWithPositionModel} from '../models/pony.model';
import { Subject, Subscription, EMPTY, interval } from 'rxjs';
import { filter, tap, switchMap, groupBy, mergeMap, bufferToggle, throttleTime, map, catchError } from 'rxjs/operators';

@Component({
    selector: 'pr-live',
    templateUrl: './live.component.html',
    styleUrls: ['./live.component.css'],
})
export class LiveComponent implements OnInit, OnDestroy{
    raceModel: RaceModel;
    poniesWithPosition: Array<PonyWithPositionModel> = [];
    positionSubscription: Subscription;
    error: boolean;
    winners: Array<PonyWithPositionModel>;
    clickSubject = new Subject<PonyWithPositionModel>();
    betWon: boolean;

    constructor(private raceService: RaceService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        const id = +this.route.snapshot.paramMap.get('raceId');
        this.positionSubscription = this.raceService.get(id)// call the raceService.get(id) method to return an observable
            .pipe(tap((race: RaceModel) => (this.raceModel = race)), // store the emitted race in the raceModel with tap
                filter(race => this.raceModel.status !== 'FINISHED'), // emit the race if status is different from 'FINISHED'
                switchMap(race => this.raceService.live(race.id))) // chain a call to raceService
            .subscribe({ // subscribe the positions.
                next: positions => {
                    this.poniesWithPosition = positions; // next handler the positions in the field poniesWithPosition
                    this.raceModel.status = 'RUNNING'; // and update the raceModel status to 'RUNNING'
                },
                error: () => (this.error = true),
                complete: () => {
                    this.raceModel.status = 'FINISHED'; // update the raceModel status to 'FINISHED'
                    this.winners = this.poniesWithPosition.filter(pony => pony.position >= 100); // store the winners
                    this.betWon = this.winners.some(pony => pony.id === this.raceModel.betPonyId);
                }
            });
        this.clickSubject // click on pony to support him
            .pipe(
                groupBy( // transform one observable in 5
                    pony => pony.id,
                    pony => pony.id
                ),
                mergeMap(obs => obs.pipe(bufferToggle(obs, () => interval(1000)))), // grouping in array clicks
                filter(array => array.length >= 1),
                throttleTime(1000),
                map(array => array[0]),
                switchMap(ponyId => this.raceService.boost(this.raceModel.id, ponyId).pipe(catchError(() => EMPTY))),
            )
            .subscribe(() => {
            }); // if dont need return value of boost can write like this
    }

    ngOnDestroy(): void {
        if (this.positionSubscription) {
            this.positionSubscription.unsubscribe();
        }
    }

    onClick(pony: PonyWithPositionModel): void {
        this.clickSubject.next(pony);
    }

    ponyById(index: number, pony: PonyWithPositionModel): number {
        return pony.id;
    }
}
