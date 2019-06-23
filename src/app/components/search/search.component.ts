import { Component, OnInit } from '@angular/core';
import { DBService } from '../../db.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Book } from '../../book.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchForm: FormGroup;
  display: boolean;
  error: boolean;
  book: Book[];
  displayedColumns = ['isbn', 'title', 'author', 'description', 'subject', 'origPrice', 'curPrice'];
  constructor(private db: DBService, private router: Router, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
        type: ['', Validators.required],
        value: ['', Validators.required]
    });
  }

  search(type, value) {
       this.ngOnInit();
       this.db.search(type, value).subscribe((res: Book[]) => {
           this.book = res;
           if (this.book.length > 0) {
              this.display = true;
          } else {
              this.error = true;
          }
          console.log(res);
       });
  }

  searchAll() {
      this.ngOnInit();
      this.db.searchAll().subscribe( (res: Book[]) => {
          this.book = res;
          if (this.book.length > 0) {
              this.display = true;
          } else {
              this.error = true;
          }
          console.log(res);
      });
  }

  ngOnInit() {
      this.error = false;
      this.display = false;
  }

}
