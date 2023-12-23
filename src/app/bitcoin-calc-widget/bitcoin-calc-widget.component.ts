import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { BitcoinService } from "../bitcoin.service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
  selector: "app-bitcoin-calc-widget",
  templateUrl: "./bitcoin-calc-widget.component.html",
  styleUrls: ["./bitcoin-calc-widget.component.scss"],
})
export class BitcoinCalcWidgetComponent implements OnInit, OnDestroy {
  btcBought: string;
  btcToday: number;
  btcAmount: number = 0;

  profit;
  profitPercentage;
  loss;
  lossPercentage;
  status: string;
  resultReady: boolean = false;

  private ngOnDestroy$ = new Subject<void>();

  constructor(private bitcoinService: BitcoinService) {}

  ngOnInit(): void {
    this.getCurrentBTC();
  }

  calculate(form: NgForm) {
    this.resultReady = true;
    let btcBought = this.currencyToNumber(form.value.btcBought);
    let btcAmount = form.value.btcAmount;
    let btcToday = form.value.btcToday;

    let profit = btcToday * btcAmount - btcBought * btcAmount;
    let loss = btcBought * btcAmount - btcToday * btcAmount;
    let profitPercentage = (profit / (btcBought * btcAmount)) * 100;
    let pp = Math.round(profitPercentage);
    let lossPercentage = (loss / (btcBought * btcAmount)) * 100;
    let lp = Math.round(lossPercentage);

    if (profit > 0) {
      this.status = "profit";
      this.profit = profit;
      this.profitPercentage = pp;
    } else if (profit < 0) {
      this.status = "loss";
      this.loss = loss;
      this.lossPercentage = lp;
    }

    // form.resetForm();

    this.btcBought = "";
    this.btcAmount = 0;
  }

  getCurrentBTC() {
    this.bitcoinService
      .getCurrentBTC()
      .pipe(takeUntil(this.ngOnDestroy$))
      .subscribe((data: any) => {
        this.btcToday = data;
      });
  }

  numberToCurrencyFormat(amount: number): string {
    if (!amount) {
      return "";
    }
    return `${amount.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
  }

  currencyToNumber(amount): number {
    if (typeof amount !== "string") {
      amount = amount.toString();
    }
    return +amount.replace(/,|_/g, "").replace("₦", "");
  }

  isNumberKey(evt) {
    const charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  checkIfAmountIsValid(amount) {
    this.btcBought = this.numberToCurrencyFormat(this.currencyToNumber(amount));
  }

  ngOnDestroy() {
    this.ngOnDestroy$.next();
    this.ngOnDestroy$.complete();
  }
}
