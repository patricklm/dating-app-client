import { Component, inject, OnInit } from '@angular/core';
import { MemberService } from '../../_services/member.service';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { MemberCardComponent } from '../member-card/member-card.component';

import { FormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

@Component({
  selector: 'app-member-list',
  imports: [MemberCardComponent, PaginationModule, FormsModule, ButtonsModule],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css',
})
export class MemberListComponent implements OnInit {

  memberService = inject(MemberService);

  genderList = [
    { value: 'male', display: 'Males' },
    { value: 'female', display: 'Females' },
  ];

  loadMembers() {
    this.memberService.getMembers();
  }
  resetFilters() {
    this.memberService.resetUserParams();
    this.loadMembers();
  }
  ngOnInit(): void {
    if (!this.memberService.paginatedResult()) {
      this.loadMembers();
    }
  }

  pageChanged(event: any) {
    if (this.memberService.userParams().pageNumber !== event.page) {
      this.memberService.userParams().pageNumber = event.page;
      this.loadMembers();
    }
  }
}
