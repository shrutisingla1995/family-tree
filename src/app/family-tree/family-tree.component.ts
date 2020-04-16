import { Component, AfterViewInit, ElementRef, ViewChild} from '@angular/core';
import { Network, DataSet } from 'vis';
import { FirebaseService } from '../firebase.service';


@Component({
  selector: 'app-family-tree',
  templateUrl: './family-tree.component.html',
  styleUrls: ['./family-tree.component.scss']
})
export class FamilyTreeComponent implements AfterViewInit {
  relations= [];
  constructor(private fireDB: FirebaseService) { }
     // create an array with nodes
     
     @ViewChild('network', {static: false}) el: ElementRef;
     private networkInstance: any;
     nodeArr = [];
     edgeArr = [];
     ngOnInit() {
       
      }      
     ngAfterViewInit() {
      this.fireDB.getList().subscribe(res => {
        this.relations = res;
        console.log('my rel:' ,this.relations)
        const container = this.el.nativeElement;
        for (let i = 0; i < this.relations.length; i++) {
          if( this.relations[i].firstName){
            var node = {
              id : this.relations[i].id,
              label : this.relations[i].firstName+ ' ' + this.relations[i].lastName +'\n Blood group : ' + this.relations[i].bloodGroup,
              group: this.relations[i].bloodGroup
            }
            this.nodeArr.push(node);
          }
        }
       const nodes = this.nodeArr;
      for (let i = 0; i < this.relations.length; i++) {
        if(this.relations[i].relationType == "member"){
          var head = {
            from: this.relations[i].relationWith,
            to: this.relations[i].id,
            label: this.relations[i].relation,
            length:200
          }
          this.edgeArr.push(head);
        }
      }
       const edges = this.edgeArr;
       const data = { nodes, edges };
       var options = {
        autoResize: false,
        height: '1000px',
        width: '1000px',
        interaction:{
          hover:true
        },
        nodes: {
          color: {
            background: 'white',
            border: 'red',
            highlight: {
              background: 'white',
              border: 'black',
            }
          },
          shape: 'box',
        },
        groups: {
          'A+': {
            shape: 'triangle',
            color: 'pink' 
          },
          'O+': {
            shape: 'circle',
            color: 'pink' 
           },
          'B+': {
            shape: 'star',
            color: 'grey' 
          },
          'AB+': {
            shape: 'box',
            color: 'pink' 
          },
          'A-': {
            shape: 'rectangle',
            color: 'grey' 
          },
          'O-': {
            shape: 'dot',
            color: 'black' 
          },
          'B-': {
            shape: 'diamond',
            color: 'pink' 
          },
          'AB-': {
            shape: 'triangleDown',
            color: 'grey' 
          },
       }
      }
        this.networkInstance = new Network(container, data, options);
    });

      }
     
}

