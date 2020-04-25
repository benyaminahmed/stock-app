import { Component, Input } from '@angular/core';

import { StockPrice } from '../../models/stock-price';

@Component({
  selector: 'app-time-series-daily',
  templateUrl: './time-series-daily.component.html',
  styleUrls: ['./time-series-daily.component.scss']
})
export class TimeSeriesDailyComponent {

  @Input() stockPrices: StockPrice[];
  @Input() symbol: string;
  @Input() companyName: string;
  @Input() region: string;
}

