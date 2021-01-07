import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class BitcoinService {

  BASE_URL = 'https://api.coindesk.com/v1/bpi/currentprice.json';

  constructor(private httpClient: HttpClient) { }



  getCurrentBTC() {
    return this.httpClient.get(this.BASE_URL);
  }
}
