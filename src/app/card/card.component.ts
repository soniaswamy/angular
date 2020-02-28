import { Component, OnInit, OnChanges, Input, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Card} from '../models/card-model';
import {CharacterDetailsApiService} from '../services/character-details-api.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, OnChanges {
  @Input() selectedFilter=[];
  cards: Card[] = [];
  sortAttr: string = 'id';
  sortAttrDesc : boolean = false;
  constructor(private httpClient: HttpClient,
     private CharacterDetails: CharacterDetailsApiService) { }

  ngOnInit() {
   this.loadDetails();
  }
  ngOnChanges(changes: SimpleChanges) {
   // console.log(changes);
  /* this.selectedFilter = changes.selectedFilter.currentValue;
   this.cd.detectChanges();
   let filterVal = this.selectedFilter;
   console.log('dfds' ,  this.selectedFilter);*/
   if(changes.selectedFilter.currentValue != changes.selectedFilter.previousValue){
    this.onChangeFilteredVal();
   }
  }
  loadDetails() {
    this.CharacterDetails.getAll()
    .subscribe(cards => {
        this.cards = cards['results'];
       // console.log(this.cards);
      });
  }
  search(searchVal: HTMLInputElement) {
    // console.log(searchVal.value);
    let inputVal = searchVal.value;
    let query = '';
    query += 'name=' + inputVal;
    this.CharacterDetails.getSearchByName(query).subscribe(response => {
      this.cards = response['results'];
      // console.log(response);
    })
  }
  onChangeFilteredVal() {
    let query = '';
    this.selectedFilter.forEach(element => {    
      // console.log(element);
      query += element.type + '=' + element.value + '&' ;      
    });
    this.CharacterDetails.getFilteredByVal(query).subscribe(response => {
        this.cards = response['results'];
        // console.log(response);
      }, error => {
        console.log(error);
      })
  }
 
  onRemoveClick(val) {
    //console.log(val);
    let temp = {...this.selectedFilter[val]};
    this.selectedFilter.splice(val,1);
    this.CharacterDetails.setFilterSubject(temp);
    this.onChangeFilteredVal();
  }

}
