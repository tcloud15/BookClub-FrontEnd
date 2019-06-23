import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DBService } from './db.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatDividerModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatDialogModule } from '@angular/material';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { RegisterComponent } from './components/register/register.component';
import { MemberHomeComponent } from './components/member-home/member-home.component';
import { EditBookComponent } from './components/member-home/edit-book/edit-book.component';
import { AddBookComponent } from './components/member-home/add-book/add-book.component';
import { SettingsComponent } from './components/member-home/settings/settings.component';
import { DialogComponent } from './components/member-home/settings/dialog/dialog.component';

const routes: Routes = [
    { path: 'Register', component: RegisterComponent },
    { path: 'Home', component: HomeComponent },
    { path: 'Detail/:unid', component: BookDetailComponent},
    { path: 'Detail', redirectTo: '/Home'},
    { path: 'Search', component: SearchComponent },
    { path: 'Member', component: MemberHomeComponent },
    { path: 'Edit/:unid', component: EditBookComponent },
    { path: 'Add', component: AddBookComponent },
    { path: 'Settings', component: SettingsComponent },
    { path: 'blank', component: MemberHomeComponent},
    { path: '', redirectTo: '/Home', pathMatch: 'full' }
];

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        SearchComponent,
        BookDetailComponent,
        RegisterComponent,
        MemberHomeComponent,
        EditBookComponent,
        AddBookComponent,
        SettingsComponent,
        DialogComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        BrowserAnimationsModule,
        HttpClientModule,
        MatToolbarModule,
        MatListModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        MatButtonModule,
        MatOptionModule,
        MatCardModule,
        MatTableModule,
        MatSnackBarModule,
        MatDividerModule,
        MatPaginatorModule,
        ReactiveFormsModule,
        MatDialogModule,
    ],
    entryComponents: [
      DialogComponent,
    ],
    providers: [DBService],
    bootstrap: [AppComponent]
})
export class AppModule { }
