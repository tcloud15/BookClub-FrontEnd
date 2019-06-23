import { Component, OnInit } from '@angular/core';
import { DBService } from '../../db.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private db: DBService, private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      phone: '',
      major: '',
      name: ''
    });
  }

  ngOnInit() {
  }

  register(uname, email, major, name, phone, password) {
    // email verification
    if (email.includes(" ") || !(email.includes("@")) || !(email.includes(".com")
      || !(email.includes(".edu")) || !(email.includes(".org")))) {
        this.snackBar.open('Your email did not meet the requirements, try again', 'OK', {
          duration: 3000
        });
        return;
    }

    // password verification
    if (password.includes(" ") || password.length < 3 || password.length > 18) {
      this.snackBar.open('Your password did not meet the requirements, try again.', 'OK', {
        duration: 3000
      });
      return;
    }

    this.db.register(uname, email, major, name, phone, password).subscribe((res: any) => {
      console.log(res);
      if (res === false) {
        console.log('here');
          this.snackBar.open('This username already exists, try another', 'OK', {
              duration: 3000
          });
      } else {
        this.snackBar.open(res.errors, 'OK', {
            duration: 3000
        });
      }
      if (res.length === 1) {
        this.snackBar.open('Registered successfully', 'OK', {
          duration: 3000
        });
          this.router.navigate(['/Home']);
      }
    });
  }
}
