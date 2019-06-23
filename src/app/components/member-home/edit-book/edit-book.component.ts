import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DBService } from '../../../db.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-edit-book',
    templateUrl: './edit-book.component.html',
    styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

    editBookForm: FormGroup;
    unid: String;
    data: any = {};

    constructor(private db: DBService, private fb: FormBuilder, private router: Router,
        private route: ActivatedRoute, private snackBar: MatSnackBar) {
        this.editBookForm = this.fb.group({
            isbn: ['', Validators.required],
            title: ['', Validators.required],
            author: ['', Validators.required],
            subject: '',
            description: '',
            oprice: '',
            cprice: '',
            url: ''
        });
    }

    ngOnInit() {
        if (sessionStorage.getItem('user-jwt') == null) {
            this.snackBar.open('Please login to view this page', 'OK', {
                duration: 3000
            });
            this.router.navigate(['/Home']);
        }

        this.route.params.subscribe(params => {
            this.unid = params.unid;
            this.db.getBookDetails(this.unid).subscribe((res: any) => {
                this.data = res[0];
                console.log(res);
                this.editBookForm.get('isbn').setValue(this.data.Isbn);
                this.editBookForm.get('title').setValue(this.data.Title);
                this.editBookForm.get('author').setValue(this.data.Author);
                this.editBookForm.get('subject').setValue(this.data.Subject);
                this.editBookForm.get('description').setValue(this.data.Description);
                this.editBookForm.get('cprice').setValue(this.data.listPrice);
                this.editBookForm.get('oprice').setValue(this.data.origPrice);
                this.editBookForm.get('url').setValue(this.data.Image_URL);
            });
        });

    }

    editBook(isbn, title, author, description, subject, cprice, oprice, url) {
        this.db.editBookDetails(this.unid, isbn, title, author, description, subject, cprice, oprice, url).subscribe((res: any) => {
            this.snackBar.open('Book info updated successfully', 'OK', {
                duration: 3000
            });
            console.log(res);
        });
    }

}
