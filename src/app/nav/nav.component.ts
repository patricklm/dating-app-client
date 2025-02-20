import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService, UserLoginProps } from '../_services/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, BsDropdownModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  accountService = inject(AccountService);
  model: UserLoginProps = {};

  login() {
    this.accountService.login(this.model).subscribe({
      next: (resp) => {
        console.log(resp);
      },
      error: (error) => console.error(error),
    });
  }

  logout() {
    this.accountService.logout();
  }
}
