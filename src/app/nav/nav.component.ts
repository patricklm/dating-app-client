import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, BsDropdownModule, RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  router = inject(Router);
  accountService = inject(AccountService);
  toastrService = inject(ToastrService);
  model: any = {};

  loggedInUser = computed(() => {
    const name = this.accountService.currentUser()?.username;
    if (name)
      return `${name[0].toUpperCase()}${name.slice(1).toLocaleLowerCase()}`;

    return 'Guest';
  });
  login() {
    this.accountService.login(this.model).subscribe({
      next: () => this.router.navigateByUrl('/members'),
      error: (error) => this.toastrService.error(error.error),
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
