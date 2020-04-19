import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';

import { Sector } from '../shared/models/sector';
import { AlphaVantageService } from '../shared/services/alpha-vantage.service';

@Component({
  selector: 'app-sectors',
  templateUrl: './sectors.component.html',
  styleUrls: ['./sectors.component.scss']
})
export class SectorsComponent implements OnInit {

  sectors: Sector[];
  loading = false;

  constructor(private alphaVantageSvc: AlphaVantageService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.alphaVantageSvc
      .getSectors()
      .pipe(
        map(res => {
          this.sectors = this.mapSectors(res);
          this.loading = false;
        }))
      .subscribe();
  }

  mapSectors(data): Sector[] {
    const sectors = new Array<Sector>();
    if (data) {

      const sectorsResponse = data['Rank A: Real-Time Performance'];
      for (const [key, value] of Object.entries(sectorsResponse)) {
        sectors.push({
          name: key,
          value
        } as Sector);
      }
    }

    return sectors;
  }
}
