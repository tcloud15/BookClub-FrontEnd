import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DBService {
  constructor(private http: HttpClient) { }
  getBooks() {
    return this.http.get('http://localhost:4000/client/Book');

  }
  login(email: String, pw: String) {
    return this.http.put('http://localhost:4000/verify/login', {
        email: email,
        password: pw
    });
   }
   searchAll() {
      return this.http.get('http://localhost:4000/client/All');
   }
   search(type: String, value: String) {
     return this.http.put('http://localhost:4000/client/Book', {
         type: type,
         value: value
     });
   }
   searchDetail(unid: String) {
      return this.http.put('http://localhost:4000/client/Detail', {
          unid: unid
      });
   }
   register(uname: String, email: String, major: String, name: String, phone: String, password: String) {
      return this.http.put('http://localhost:4000/verify/register', {
          uname: uname,
          email: email,
          major: major,
          name: name,
          phone: phone,
          password: password
      });
   }
   createBook(isbn: String, title: String, author: String, description: String,
              subject: String, oprice: String, cprice: String, url: String, member: String) {
      return this.http.put('http://localhost:4000/client/Create', {
          isbn: isbn,
          title: title,
          author: author,
          description: description,
          subject: subject,
          oprice: oprice,
          cprice: cprice,
          url: url,
          member: member
      });
   }
   getMemberBooks(member: String) {
      return this.http.put('http://localhost:4000/client/Memberbooks', {
          member: member
      });
   }
   delete(unid: String) {
      return this.http.put('http://localhost:4000/client/Delete', {
          unid: unid
      });
   }
   deleteIntBook(unid: String, uname: String) {
      return this.http.put('http://localhost:4000/client/DeleteIntBook', {
          unid: unid,
          uname: uname
      });
   }
   interested(member: String, book: String) {
      return this.http.put('http://localhost:4000/client/Interested', {
          member: member,
          book: book,
          auth_token: sessionStorage.getItem('user-jwt')
      });
   }
   interestedMember(member: String) {
      return this.http.put('http://localhost:4000/client/MemberIntBooks', {
          member: member
      });
   }
   updatemajor(major: String, uname: String) {
       return this.http.put('http://localhost:4000/client/updatemajor', {
           major: major,
           uname: uname
       });
   }
   updatename(name: String, uname: String) {
       return this.http.put('http://localhost:4000/client/updatename', {
           name: name,
           uname: uname
       });
   }
   updatephonenum(phone: String, uname: String) {
       return this.http.put('http://localhost:4000/client/updatephonenum', {
           phone: phone,
           uname: uname
       });
   }
   updatepassword(password: String, uname: String) {
        return this.http.put('http://localhost:4000/client/updatepassword', {
            password: password,
            uname: uname
        });
    }
   getMember(uname: String) {
       return this.http.put('http://localhost:4000/client/getmember', {
           uname: uname
       });
   }
   editBookDetails(unid: String, isbn: String, title: String, author: String, description:
       String, subject: String, cprice: String, oprice: String, url: String) {
      return this.http.put('http://localhost:4000/client/editBookDetails', {
          unid: unid,
          isbn: isbn,
          title: title,
          author: author,
          description: description,
          subject: subject,
          cprice: cprice,
          oprice: oprice,
          url: url
      });
  }
  getBookDetails(unid: String) {
      return this.http.put('http://localhost:4000/client/getBookDetails', {
          unid: unid
      });
  }
  countInterested(uname: String) {
      return this.http.put('http://localhost:4000/client/count', {
          uname: uname
      });
  }
  getCountInt(uname: String) {
      return this.http.put('http://localhost:4000/client/getCount', {
          uname: uname
      });
  }
  showIntUser(uname: String) {
      return this.http.put('http://localhost:4000/client/showIntUser', {
          uname: uname
      });
  }
  updateCount(uname: String) {
      return this.http.put('http://localhost:4000/client/updateCount', {
          uname: uname
      });
  }
  deleteaccount(uname: String) {
      return this.http.put('http://localhost:4000/client/deleteaccount', {
          uname: uname
      });
  }
}
