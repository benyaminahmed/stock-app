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
  @Output() outputLoadStockPrices: EventEmitter<Company[]> =
    new EventEmitter<Company[]>();

  searchInput: string;
  searchForm: FormGroup;
  loading = false;
  stockPrices: Company[];

  constructor(private alphaVantageSvc: AlphaVantageService) {
  }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      searchCtrl: new FormControl('')
    });
  }

  onChangeSearchInput(e) {
    this.searchInput = e.currentTarget.value;
    this.stockPrices = null;
    this.loading = true;
    this.alphaVantageSvc
      .getCompanies(this.searchInput)
      .pipe(
        map(res => {
          this.stockPrices = this.mapCompanies(res);
          this.outputLoadStockPrices.emit(this.stockPrices);
          this.loading = false;
        }))
      .subscribe();
  }

  mapCompanies(data: any): Company[] {

    const res = new Array<Company>();
    return res;
  }

}
