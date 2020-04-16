import { AngularFireModule } from '@angular/fire';
import * as firebase from 'firebase';

export const environment = {
  production: false,
  firebase
};
firebase.initializeApp( {
  apiKey: ' AIzaSyDRlz0j_ZLJps2_ox96EOjoj_lta-Wsgjc ',
  authDomain: 'familytree-860e8.firebaseapp.com',
  databaseURL: 'https://familytree-860e8.firebaseio.com',
  projectId: 'familytree-860e8',
  storageBucket: 'familytree-860e8.appspot.com',
  messagingSenderId: '294385887452'
})
