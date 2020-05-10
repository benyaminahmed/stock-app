import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit {

  tickerForm: FormGroup;
  loading = false;
  tickerInput: string;
  tickers: Array<string> = new Array<string>();

  ngOnInit(): void {

    this.tickerForm = new FormGroup({
      tickerCtrl: new FormControl(this.tickerInput ? this.tickerInput : '')
    });

  }

  onClickAddTicker(): void {
    if (this.tickerForm.controls.tickerCtrl.value) {
      const value = this.tickerForm.controls.tickerCtrl.value.toUpperCase();
      if (!this.tickers.find(v => v === value)) {
        this.tickers.push(value);
      }
    }
  }
}
