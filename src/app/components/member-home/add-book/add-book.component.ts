import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DBService } from '../../../db.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

    addBookForm: FormGroup;

    constructor(private db: DBService, private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) {
        this.addBookForm = this.fb.group({
            isbn: ['', Validators.required],
            title: ['', Validators.required],
            author: ['', Validators.required],
            subject: '',
            description: '',
            oprice: '',
            cprice: '',
            url: ' '
        });
    }

  ngOnInit() {
    if (sessionStorage.getItem('user-jwt') == null) {
        this.snackBar.open('Please login to view this page', 'OK', {
          duration: 3000
        });
        this.router.navigate(['/Home']);
      }
  }

  get userid(): any {
      return sessionStorage.getItem('userid');
    }

  createBook(isbn, title, author, description, subject, oprice, cprice, url) {
      this.ngOnInit();
      this.db.createBook(isbn, title, author, description, subject, oprice, cprice, url, this.userid).subscribe((res: any) => {
        console.log(res);
        if (res.affectedRows > 0) {
            this.snackBar.open('Book added successfully', 'OK', {
                duration: 3000
            });
        }
      });
      this.addBookForm.reset();
    }

}
