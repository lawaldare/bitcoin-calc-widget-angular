import { BrowserModule } from "@angular/platform-browser";
import { NgModule, Injector } from "@angular/core";

import { AppComponent } from "./app.component";
import { BitcoinCalcWidgetComponent } from "./bitcoin-calc-widget/bitcoin-calc-widget.component";

import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { createCustomElement } from "@angular/elements";

@NgModule({
  declarations: [AppComponent, BitcoinCalcWidgetComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private injector: Injector) {
    const myElement = createCustomElement(AppComponent, { injector });
    customElements.define("bitcoin-calculator-widget", myElement);
  }
}
