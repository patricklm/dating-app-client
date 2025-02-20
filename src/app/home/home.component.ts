import { Component, inject } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-home',
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  env = environment;
  registerMode = false;

  http = inject(HttpClient);

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  onCancelRegister() {
    this.registerMode = false;
  }
}
