import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { DBService } from '../../../../db.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DialogComponent>, private db: DBService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  deleteaccount(uname) {
    uname = sessionStorage.getItem('userid');
    console.log(uname);
    this.db.deleteaccount(uname).subscribe((res: any) => {
        console.log(res);
        if (res.affectedRows > 0) {
          sessionStorage.removeItem('userid');
          sessionStorage.removeItem('username');
          sessionStorage.removeItem('user-jwt');
          this.router.navigate(['/Home']);
          this.snackBar.open('Account deleted!', 'OK', {
              duration: 3000
          });
          this.dialogRef.close();
        } else {
          this.snackBar.open('Account is not deleted, please try again!', 'OK', {
              duration: 3000
          });
          this.dialogRef.close();
        }
        console.log(res);
    });
  }
}
