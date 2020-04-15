import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';

import { Company } from '../shared/models/company';

const More = require('highcharts/highcharts-more');
More(Highcharts);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  companies: Company[];

  onOutputLoadCompanies(event) {

    this.companies = event;
  }
}


