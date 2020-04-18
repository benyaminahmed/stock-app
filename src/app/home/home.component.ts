import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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

  constructor(public activatedRoute: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.searchInput = params.searchInput;
    });
  }

  onOutputLoadCompanies(event) {

    this.companies = event;
  }

  onOutputSearchInput(event) {
    this.router.navigate(['home', event]);
  }
}


