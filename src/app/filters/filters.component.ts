import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Card} from '../models/card-model';
import {CharacterDetailsApiService} from '../services/character-details-api.service';
import {FormGroup, FormControl, FormBuilder, FormArray} from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
@Output() changedFilter = new EventEmitter();
  cards: Card[] = [];
  myForm: FormGroup;
  human: boolean = false;
  Mythology: boolean = false;
  OtherSpecies:boolean = false;
  
  constructor(private httpClient: HttpClient, 
    private CharacterDetails: CharacterDetailsApiService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      species: this.fb.array([]),
      gender: this.fb.array([]),
      origin: this.fb.array([])
    });
    this.CharacterDetails.getFilterSubject().subscribe(val => {
     // console.log('dfd',val);
     // console.log(this.myForm);
     this.myForm.controls['species'].value.forEach(element => {
       // console.log('species', element);
       this[element] = false;
       this.checkedVal(element, false);
     });
     this.myForm.controls['gender'].value.forEach(element => {
      // console.log('species', element);
      this[element] = false;
      this.checkedVal(element, false);
    });
    this.myForm.controls['origin'].value.forEach(element => {
      // console.log('species', element);
      this[element] = false;
      this.checkedVal(element, false);
    });
    });
    // this.myForm = this.getCheckedValues();
    // this.loadDetails();
  }
  
  checkedVal(species: string, isChecked: boolean) {
    let speciesFormArray = <FormArray>this.myForm.controls.species;

    if (isChecked) {
      speciesFormArray.push(new FormControl(species));
    } else {
      let index = speciesFormArray.controls.findIndex(x => x.value == species)
      speciesFormArray.removeAt(index);
    }
    
     //console.log(this.myForm.value);
     // this.changedFilter.emit(this.myForm.value);
     let dataArray = [];
      for(let key in this.myForm.value){
      this.myForm.value[key].forEach(item=>{
          dataArray.push({type:key,value:item})
      }) 
    } 
this.changedFilter.emit(dataArray);
// console.log(dataArray);
  }
  checkedValGender(gender: string, isChecked: boolean) {
    let genderFormArray = <FormArray>this.myForm.controls.gender;

    if (isChecked) {
      genderFormArray.push(new FormControl(gender));
    } else {
      let index = genderFormArray.controls.findIndex(x => x.value == gender)
      genderFormArray.removeAt(index);
    }
    
     //console.log(this.myForm.value);
     let dataArray = [];
      for(let key in this.myForm.value){
      this.myForm.value[key].forEach(item=>{
          dataArray.push({type:key,value:item})
      }) 
    } 
this.changedFilter.emit(dataArray);
  }
  checkedValOrigin(origin: string, isChecked: boolean) {
    let originFormArray = <FormArray>this.myForm.controls.origin;

    if (isChecked) {
      originFormArray.push(new FormControl(origin));
    } else {
      let index = originFormArray.controls.findIndex(x => x.value == origin)
      originFormArray.removeAt(index);
    }
    
    let dataArray = [];
      for(let key in this.myForm.value){
      this.myForm.value[key].forEach(item=>{
          dataArray.push({type:key,value:item})
      }) 
    } 
    this.changedFilter.emit(dataArray);
  }
  loadDetails() {
    this.CharacterDetails.getAll()
    .subscribe(cards => {
        this.cards = cards['results'];        
         //console.log(this.cards);
      });
  }
  getCheckedValues() {    
     // let currFrmGrp = {};
     // currFrmGrp['species'] = new FormControl('' || '');
     // currFrmGrp['gender'] = new FormControl('' || '');
     // currFrmGrp['origin'] = new FormControl('' || '');
     // return new FormGroup(currFrmGrp);
    // let query = '';
    // query += 'species' + filterVal + '&gender' + filterVal + '&origin' + filterVal;
  }

}
