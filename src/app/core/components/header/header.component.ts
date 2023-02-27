import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ExchangeRateInterface} from "../../interfaces/currency";
import {Subject} from "rxjs";
import {CurrencyService} from "../../services/currency.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  private destroy$: Subject<null> = new Subject<null>();
  public exchangeRatesUsd!: ExchangeRateInterface;
  public exchangeRatesEur!: ExchangeRateInterface;


  constructor(
    private currencyService: CurrencyService,
  ) {
  }

  ngOnInit(): void {
    this.getCurrencyToHeader();
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  public getCurrencyToHeader(): void {
    this.currencyService.getExchangeToHeader('USD', 'UAH', 1)
      .subscribe(response => {
        this.exchangeRatesUsd = response;
        console.log(this.exchangeRatesUsd)
      });
    this.currencyService.getExchangeToHeader('EUR', 'UAH', 1)
      .subscribe(response => {
        this.exchangeRatesEur = response;
        console.log(this.exchangeRatesEur)
      });
  }
}
