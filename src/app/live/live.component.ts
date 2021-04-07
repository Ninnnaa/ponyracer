import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RaceService } from '../race.service';
import { RaceModel } from '../models/race.model';
import {PonyWithPositionModel} from '../models/pony.model';
import { Subscription } from 'rxjs';
import { filter, tap, switchMap } from 'rxjs/operators';

@Component({
    selector: 'pr-live',
    templateUrl: './live.component.html',
    styleUrls: ['./live.component.css'],
})
export class LiveComponent implements OnInit, OnDestroy{
    raceModel: RaceModel;
    poniesWithPosition: Array<PonyWithPositionModel>;
    positionSubscription: Subscription;
    error: boolean;
    winners: Array<PonyWithPositionModel>;
    betWon: boolean;

    constructor(private raceService: RaceService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        const id = +this.route.snapshot.paramMap.get('raceId');
        this.raceService.get(id).subscribe(race => (this.raceModel = race));
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
    }

    ngOnDestroy(): void {
        if (this.positionSubscription) {
            this.positionSubscription.unsubscribe();
        }
    }
}
