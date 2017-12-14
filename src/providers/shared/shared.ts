import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";

@Injectable()
export class SharedProvider {

  constructor(public http: HttpClient) {
    console.log('Hello SharedProvider Provider');
  }

  private emitChangeSource = new Subject<any>();

  changeEmitted$ = this.emitChangeSource.asObservable();

  emitChange(change: any) {
    this.emitChangeSource.next(change);
  }

}
