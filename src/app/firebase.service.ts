import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  ref = firebase.firestore().collection('relations');

  constructor() { }
    postForm(value){
      return this.ref.add({
        firstName: value.firstName,
        lastName: value.lastName,
        relation: value.relation,
        bloodGroup: value.bloodGroup,
        relationType: value.relationType,
        relationWith: value.relationWith,
      });
    }
    getList(): Observable<any> {
      return new Observable((observer) => {
         this.ref.get().then((res) => {
           let users = [];
           res.forEach(doc => {
             let data = doc.data();
             users.push({
              firstName: data.firstName,
              lastName: data.lastName,
              relation: data.relation,
              bloodGroup: data.bloodGroup,
              relationType: data.relationType,
              relationWith: data.relationWith,
              id:doc.id
             })
          });
          observer.next(users);
        });
      });
    }
      
  }
    


