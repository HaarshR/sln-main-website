import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-executive-member-page',
  templateUrl: './executive-member-page.component.html',
  styleUrls: ['./executive-member-page.component.scss']
})
export class ExecutiveMemberPageComponent implements OnInit {

  executiveMemberForm = new FormGroup({});
  constructor() { }

  ngOnInit(): void {
  }

}
