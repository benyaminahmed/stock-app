import { Component, Input } from '@angular/core';

import { Sector } from '../../models/sector';

@Component({
  selector: 'app-sector-card',
  templateUrl: './sector-card.component.html',
  styleUrls: ['./sector-card.component.scss']
})
export class SectorCardComponent {

  @Input() sector: Sector;

}
