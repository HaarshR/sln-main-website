import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-department-page',
  templateUrl: './department-page.component.html',
  styleUrls: ['./department-page.component.scss'],
})
export class DepartmentPageComponent implements OnInit {
  departments = [1, 2, 3];

  constructor() {}

  ngOnInit(): void {}
}
