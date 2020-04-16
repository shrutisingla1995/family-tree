import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  relationForm = new FormGroup({
    firstName: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    relation: new FormControl(''),
    bloodGroup: new FormControl('',Validators.required),
    relationType: new FormControl('',Validators.required),
    relationWith: new FormControl('')
  });
  allRelations = [];
  constructor(private router: Router,private fireDB: FirebaseService) { }
  get RelationType(): any { 
    return this.relationForm.get('relationType');
   }
  ngOnInit() {
    // this.allRelations = JSON.parse(localStorage.getItem('relationsList'));
    this.getUsers();
  }
  getUsers() {
    this.fireDB.getList().subscribe(res => {
        this.allRelations = res;
    });
  } 
  onSubmit(form, event){
    console.log(this.relationForm);
    if(this.relationForm.valid){
      // var oldItems = this.allRelations;
      // var newItems = this.relationForm.value;
      // // console.log(newItems);
      // oldItems.push(newItems);
      // for (let i = 0; i < oldItems.length; i++) {
      //   if(oldItems[i].firstName){
      //     if(oldItems[i].id){
      //     }else{
      //         oldItems[i].id = i + 1;
      //     }   
      //   }
      // }
      this.fireDB.postForm(form.value).then(
        res => {
          this.relationForm.reset();
          this.router.navigate(['/family-tree']);
        }
      )
      // localStorage.setItem("relationsList",JSON.stringify(oldItems));
    }else{
      alert('Please fill the required fields!');
    }
  
  }

}
