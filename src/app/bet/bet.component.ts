import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RaceModel } from '../models/race.model';
import { RaceService } from '../race.service';
import {PonyModel} from '../models/pony.model';

@Component({
  selector: 'pr-bet',
  templateUrl: './bet.component.html',
  styleUrls: ['./bet.component.css']
})
export class BetComponent implements OnInit {
    raceModel?: RaceModel;
    betFailed = false;

    constructor(private raceService: RaceService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        // @ts-ignore
        const raceId = +this.route.snapshot.paramMap.get('raceId');
        this.raceService.get(raceId).subscribe(race => (this.raceModel = race));
    }

    betOnPony(pony: PonyModel): void {
        // @ts-ignore
        this.raceService.bet(this.raceModel.id, pony.id).subscribe({
            next: race => (this.raceModel = race),
            error: () => (this.betFailed = true)
        });
    }

    isPonySelected(pony: PonyModel): boolean {
        // @ts-ignore
        return pony.id === this.raceModel.betPonyId;
    }
}
