import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlphaVantageService {

  constructor(private http: HttpClient) { }

  rootUrl = 'https://www.alphavantage.co/query';

  getTimeSeriesDaily(symbol: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.rootUrl}?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${environment.alphaVantageApiKey}`);
  }

  getCompanies(symbol: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.rootUrl}?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${environment.alphaVantageApiKey}`);
  }

  getSectors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.rootUrl}?function=SECTOR&apikey=${environment.alphaVantageApiKey}`);
  }

  getTimeSeriesIntraday(symbol: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.rootUrl}?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${environment.alphaVantageApiKey}`);
  }

}
