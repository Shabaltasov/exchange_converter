import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiKey = 'T4p0sBEyjtwwZ7b4spFPRa69uRvyxqri';
  private apiUrl = 'https://api.apilayer.com/exchangerates_data/convert';

  constructor(private httpClient: HttpClient) {
  }

  public getExchangeRates(baseCurrency: string): Observable<any> {
    return this.httpClient.get<any>(`https://api.exchangerate.host/latest?base=${baseCurrency}&&symbols=UAH,EUR,USD,GBP`);
  }

  public getExchangeToHeader(from: string, to: string, amount: number): Observable<any> {
    const headers = new HttpHeaders({'apikey': this.apiKey});
    const options = {headers: headers};
    const url = `${this.apiUrl}?from=${from}&to=${to}&amount=${amount}`
    return this.httpClient.get<any>(url, options);
  }
}
