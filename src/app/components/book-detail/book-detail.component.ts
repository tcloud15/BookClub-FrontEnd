import { Component, Input, OnInit } from '@angular/core';
import { DBService } from '../../db.service';
import { SearchComponent } from '../search/search.component';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  @Input() searchComponent: SearchComponent;

  data: {
    Title: String,
    Author: String,
    listPrice: String,
    Description: String,
    memberUname: String,
    Image_URL: String
  };
  member: {
    uname: String,
    name: String,
    email: String,
    phone: String
  };
  unid: String;
  show: boolean;
  displayInfo: boolean;
  notLoggedIn: boolean;

  constructor(private db: DBService, private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.show = true;
    this.displayInfo = false;
    this.route.params.subscribe(params => {
      this.unid = params.unid;
      this.db.searchDetail(this.unid).subscribe((res: any) => {
        this.data = res[0];
        console.log(this.data);
      });
    });
  }

  interested() {
    this.show = false;
    const uid = sessionStorage.getItem('userid');
    const jwt = sessionStorage.getItem('user-jwt');
    console.log(uid + ' ' + jwt);
    if (this.data.memberUname === uid) {
      this.snackBar.open('This is your own book', 'OK', {
        duration: 4000
      });
      this.router.navigate(['/Search']);
      return;
    }

    if (jwt === null) {
      this.notLoggedIn = true;
    } else {
      this.db.interestedMember(uid).subscribe((res: any) => {
        console.log(res);
        let exist: boolean = false;
        for(var i = 0; i < res.length; i++) {
          console.log(res[i]["unid"]);
          console.log('bookid ' + this.unid);
          if(this.unid == res[i]["unid"]) {
            exist = true;
          }
        }
        if(exist) {
          this.snackBar.open('You are already interested in this book', 'OK', {
              duration: 3000
          });
          this.ngOnInit();
        } else {
          this.db.interested(uid, this.unid).subscribe((res: any) => {
            this.member = res[0];
            console.log(this.member);
              this.snackBar.open('Book added to your interested books list', 'OK', {
                  duration: 3000
              });
            this.displayInfo = true;
          });
        }
      });
    }
  }

  back() {
    this.router.navigate(['/Search']);
  }
}
