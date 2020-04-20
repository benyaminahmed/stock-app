import { Component, Input, OnInit } from '@angular/core';

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

  ngOnInit(): void {
    this.icon = sectorIcons[this.sector.name];
  }

}
