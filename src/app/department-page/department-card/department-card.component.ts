import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-department-card',
  templateUrl: './department-card.component.html',
  styleUrls: ['./department-card.component.scss'],
})
export class DepartmentCardComponent implements OnInit {
  @Input() department: { title: string; thumbnail: string };
  constructor() {}

  ngOnInit(): void {}

  onCardClick(): void {}
}
