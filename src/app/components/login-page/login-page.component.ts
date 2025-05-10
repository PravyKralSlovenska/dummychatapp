import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthServiceService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  form = new FormGroup({
    meno: new FormControl('Emily'),
    priezvisko: new FormControl('Johnson')
  });

  constructor(private router: Router, private auth: AuthServiceService) { }

  ngOnInit() {
    this.auth.logout();
  }

  onSubmit(): boolean {
    if (this.auth.login(this.form.value.meno!, this.form.value.priezvisko!)) {
      this.router.navigate(['']);
      return true;
    }
    this.clearForm();
    return false;
  }

  clearForm(): void {
    this.form.value.meno = '';
    this.form.value.priezvisko = '';
  }
}
