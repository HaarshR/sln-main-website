import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PageData } from 'src/models/PageData';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  private pageData: PageData = {
    navBackground: '',
    navLink: '',
    specialNavLink: '',
  };

  private pageDataSource = new BehaviorSubject(this.pageData);
  currentPageData = this.pageDataSource.asObservable();

  constructor() {}

  setPageData(pageData: PageData): void {
    this.pageDataSource.next(pageData);
  }
}
