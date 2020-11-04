import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Member } from 'src/models/Member';
import { MemberService } from './admin-members.service';
import {
  faAngleDown,
  faAngleUp,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import {
  ToolbarService,
  LinkService,
  HtmlEditorService,
  RichTextEditorComponent,
} from '@syncfusion/ej2-angular-richtexteditor';

import { environment } from '../../../environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';

const CV_URL = environment.fileUrl;
@Component({
  selector: 'app-admin-members',
  templateUrl: './admin-members.component.html',
  styleUrls: ['./admin-members.component.scss'],
  providers: [ToolbarService, LinkService, HtmlEditorService],
})
export class AdminMembersComponent implements OnInit {
  @Input() memberType: string;

  cvUrl = CV_URL + 'CVs/';

  members: Member[] = [];

  rteTools: object = {
    type: 'MultiRow',
    items: [
      'Undo',
      'Redo',
      '|',
      'Bold',
      'Italic',
      'Underline',
      'StrikeThrough',
      '|',
      'FontName',
      'FontSize',
      'FontColor',
      'BackgroundColor',
      '|',
      'Formats',
      'Alignments',
      '|',
      'OrderedList',
      'UnorderedList',
      '|',
      'Indent',
      'Outdent',
      '|',
      'CreateLink',
      'ClearFormat',
      'SourceCode',
    ],
  };
  @ViewChild('sendEmailRTE') rteEle: RichTextEditorComponent;

  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;
  faEdit = faEdit;

  isLoading = true;
  isLoading2 = false;
  isDeleting = false;
  isDeleted = false;

  fetchErrorMessage = '';
  errorMessage = '';

  sortingWay = 'asc';
  propertyName = 'date';

  deleteForm = new FormGroup({
    password: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  emailForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  constructor(
    private modalService: NgbModal,
    private membersService: MemberService
  ) {}

  ngOnInit(): void {
    this.membersService.getMembers(this.memberType).subscribe({
      next: (result) => {
        result.members.forEach((blog) => {
          this.members.push(blog);
        });
        this.isLoading = false;
      },
      error: (error) => {
        if (error.status == 404) {
          this.fetchErrorMessage = 'No blogs found!';
          this.isLoading = false;
        } else {
          this.fetchErrorMessage = 'An unknown error occured!';
          this.isLoading = false;
        }
      },
    });
  }

  cancel() {}

  openViewModal(content, mail: string = null) {
    if (mail == null) {
      this.modalService.open(content, { scrollable: true }).result.then();
    } else {
      this.modalService
        .open(content, { scrollable: true, size: 'xl' })
        .result.then();
      console.log(this.rteEle);

      try {
        this.rteEle.refreshUI;
      } catch (err) {
        console.log(err);
      }
    }
  }

  sortProperty(propertyName: string) {
    if (this.propertyName != propertyName) {
      this.isLoading = true;
      this.propertyName = propertyName;
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    }
  }

  sortWay(sortingWay: string) {
    this.isLoading = true;
    this.sortingWay = sortingWay;
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }

  deleteMember(member: Member) {
    if (this.deleteForm.invalid) {
      return;
    } else if (this.deleteForm.value.password != 'YES! I am absolutely sure.') {
      return;
    }
    this.isDeleting = false;
    this.isLoading2 = true;
    this.membersService.deleteMember(member._id, member.cv).subscribe(
      (next) => {
        this.members.splice(this.members.indexOf(member), 1);
        this.isDeleted = true;
        this.errorMessage = 'Blog deleted successfully!';
        this.isLoading2 = false;
      },
      (error) => {
        this.isDeleted = true;
        if (error.status == 404) {
          this.errorMessage = 'Error occured! Deletion failed.';
        } else {
          this.errorMessage = 'An unknown error occured!';
        }
        this.isLoading2 = false;
      }
    );
  }
}
