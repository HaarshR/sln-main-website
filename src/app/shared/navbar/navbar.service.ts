import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  private pageData: { navBackground: string; navLink: string } = {
    navBackground: '',
    navLink: '',
  };

  private pageDataSource = new BehaviorSubject(this.pageData);
  currentPageData = this.pageDataSource.asObservable();

  constructor() {}

  setPageData(pageData: { navBackground: string; navLink: string }): void {
    this.pageDataSource.next(pageData);
  }
}
