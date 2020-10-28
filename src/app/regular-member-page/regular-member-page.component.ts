import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-regular-member-page',
  templateUrl: './regular-member-page.component.html',
  styleUrls: ['./regular-member-page.component.scss']
})
export class RegularMemberPageComponent implements OnInit {

  regularMemberForm = new FormGroup({});
  constructor() { }

  ngOnInit(): void {
  }

}
