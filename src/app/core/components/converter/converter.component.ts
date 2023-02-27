import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {CurrencyService} from "../../services/currency.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Subject, take, takeUntil} from "rxjs";

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ConverterComponent implements OnInit, OnDestroy {

  public currencyGroup!: FormGroup;
  public currencyArr!: string[];
  public exchangeRates!: [];
  private destroy$: Subject<null> = new Subject<null>();

  constructor(
    private currencyService: CurrencyService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.createGroup();
    this.getCurrency('UAH');
    this.createSubscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  public changeCurrencyType(key: string): void {
    if (key === 'left') {
      const baseCurrency = this.currencyGroup.get('rightCurrencyType')?.value;
      this.getCurrency(baseCurrency);
      const value = this.currencyGroup.get('rightValue')?.value;
      this.exchange('leftValue', value, 'leftCurrencyType');
    } else if (key === 'right') {
      const baseCurrency = this.currencyGroup.get('leftCurrencyType')?.value;
      this.getCurrency(baseCurrency);
      const value = this.currencyGroup.get('leftValue')?.value;
      this.exchange('rightValue', value, 'rightCurrencyType');
    }
  }

  public changeCurrencyLeft(): void {
    this.getCurrency(this.currencyGroup.get('leftCurrencyType')?.value)
  }

  public changeCurrencyRight(): void {
    this.getCurrency(this.currencyGroup.get('rightCurrencyType')?.value)
  }

  private exchange(patchKey: string, value: number, currencyTypeKey: string): void {

    const currencyType = this.currencyGroup.get(currencyTypeKey)?.value;
    const currencyValue = (value * this.exchangeRates[currencyType]).toFixed(2);
    this.currencyGroup.patchValue({[patchKey]: +currencyValue}, {emitEvent: false});
    this.cdr.detectChanges();
  }

  private createGroup(): void {
    this.currencyGroup = this.fb.group({
      leftCurrencyType: ['UAH'],
      rightCurrencyType: ['USD'],
      leftValue: [null],
      rightValue: [null]
    })
  }

  private getCurrency(baseCurrency: string): void {
    this.currencyService.getExchangeRates(baseCurrency)
      .pipe(takeUntil(this.destroy$),
        take(1))
      .subscribe((response) => {
        this.currencyArr = Object.keys(response.rates);
        this.exchangeRates = response.rates;
        this.cdr.detectChanges();
      })
  }

  private createSubscribe(): void {
    this.currencyGroup.get('leftValue')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.exchange('rightValue', value, 'rightCurrencyType');
      })
    this.currencyGroup.get('rightValue')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.exchange('leftValue', value, 'leftCurrencyType');
      })
  }
}
