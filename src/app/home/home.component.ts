import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import * as Highcharts from 'highcharts';

import { Company } from '../shared/models/company';

const More = require('highcharts/highcharts-more');
More(Highcharts);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  companies: Company[];
  searchInput: string;

  constructor(public activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.searchInput = params.searchInput;
    });
  }

  onOutputLoadCompanies(event) {

    this.companies = event;
  }

  onOutputSearchInput(event) {
    console.log(event);
  }
}


