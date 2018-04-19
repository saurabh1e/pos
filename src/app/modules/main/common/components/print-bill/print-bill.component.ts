import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit} from '@angular/core';
import {Order} from '../../models/order';

@Component({
  selector: 'app-print-bill',
  templateUrl: './print-bill.component.html',
  styleUrls: ['./print-bill.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrintBillComponent implements OnInit {

  @Input() cart: Order;

  constructor(private elRef: ElementRef, private _cd: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  directPrint() {
    this._cd.detectChanges();
    const wnd = window.open('', '_blank', 'fullscreen=yes', true);
    wnd.document.write(
      this.elRef.nativeElement.querySelector('#printBill').innerHTML);
    wnd.print();
    wnd.close();
    return;
  }

}
