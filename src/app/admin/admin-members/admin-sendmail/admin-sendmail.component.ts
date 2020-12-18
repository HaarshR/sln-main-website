import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemberService } from '../admin-members.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  ToolbarService,
  LinkService,
  HtmlEditorService,
} from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  selector: 'app-admin-sendmail',
  templateUrl: './admin-sendmail.component.html',
  styleUrls: ['./admin-sendmail.component.scss'],
  providers: [ToolbarService, LinkService, HtmlEditorService],
})
export class AdminSendmailComponent implements OnInit {
  type;
  isLoading = true;

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

  message;
  messageError;

  emailForm = new FormGroup({
    subject: new FormControl('', {
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private memberService: MemberService
  ) {
    window.scrollTo(0, 0);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.type = params['type'];
      this.isLoading = false;
    });
  }

  sendMail() {
    if (!this.emailForm.value.email || !this.emailForm.value.subject) {
      return;
    }
    this.memberService
      .sendEmail(
        this.type,
        this.emailForm.value.email,
        this.emailForm.value.subject
      )
      .subscribe(
        (next) => {
          this.messageError = null;
          this.message = next.message;
          setTimeout(() => {
            this.message = null;
          }, 3000);
        },
        (error) => {
          this.message = null;
          this.messageError = error.error.errorMessage;
          setTimeout(() => {
            this.messageError = null;
          }, 3000);
        }
      );
  }
}
