import { Component, Input, OnInit } from '@angular/core';

import { sectorColours } from '../../helpers/colour';
import { sectorIcons } from '../../helpers/icons';
import { Sector } from '../../models/sector';

@Component({
  selector: 'app-sector-card',
  templateUrl: './sector-card.component.html',
  styleUrls: ['./sector-card.component.scss']
})
export class SectorCardComponent implements OnInit {

  @Input() sector: Sector;

  icon: string;
  colour: string;

  ngOnInit(): void {
    this.icon = sectorIcons[this.sector.name];
    this.colour = sectorColours[this.sector.name];
  }

}
