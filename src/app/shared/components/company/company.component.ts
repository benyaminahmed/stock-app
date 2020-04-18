import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs/internal/operators/map';

import { Company } from '../../models/company';
import { AlphaVantageService } from '../../services/alpha-vantage.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  @Output() outputLoadCompanies: EventEmitter<Company[]> = new EventEmitter<Company[]>();
  @Output() outputSearchInput: EventEmitter<string> = new EventEmitter<string>();

  searchInput: string;
  searchForm: FormGroup;
  loading = false;
  companies: Company[];

  constructor(private alphaVantageSvc: AlphaVantageService) {
  }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      searchCtrl: new FormControl('')
    });
  }

  onChangeSearchInput(e) {
    this.searchInput = e.currentTarget.value;
    this.outputSearchInput.emit(this.searchInput);
    this.companies = null;
    this.loading = true;
    this.alphaVantageSvc
      .getCompanies(this.searchInput)
      .pipe(
        map(res => {
          this.companies = this.mapCompanies(res);
          this.outputLoadCompanies.emit(this.companies);
          this.loading = false;
        }))
      .subscribe();
  }

  mapCompanies(data: any): Company[] {

    const res = new Array<Company>(); if (data) {
      const companies = data.bestMatches;

      companies.forEach(c => {
        const symbol = c['1. symbol'];
        const name = c['2. name'];
        const type = c['3. type'];
        const region = c['4. region'];
        const marketOpen = c['5. marketOpen'];
        const marketClose = c['6. marketClose'];
        const currency = c['8. currency'];

        res.push({
          symbol,
          name,
          type,
          region,
          marketOpen,
          marketClose,
          currency
        });
      });
    }
    return res;
  }

}
