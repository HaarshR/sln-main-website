import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  private pageData = { title: '' };

  private pageDataSource = new BehaviorSubject(this.pageData);
  currentPageData = this.pageDataSource.asObservable();

  constructor() {}

  setPageData(pageData: { title: string }): void {
    this.pageDataSource.next(pageData);
  }
}
