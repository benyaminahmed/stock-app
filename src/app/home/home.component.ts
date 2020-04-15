import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';

const More = require('highcharts/highcharts-more');
More(Highcharts);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  loading = true;

  onOutputLoadCompanies(event) {

    alert(event);
  }
}


