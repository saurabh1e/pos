import {Component, OnInit} from '@angular/core';
import {StoreService} from '../../common/services/store.service';
import {IStore} from '../../common/models/store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  stores$: Promise<IStore[]>;

  constructor(public _store: StoreService) {
  }

  ngOnInit() {
    this.stores$ = this._store.stores$;
  }

}
