import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Card} from '../models/card-model';
import {CharacterDetailsApiService} from '../services/character-details-api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  cards: Card[] = [];
  displayMode :any = 1;
  sortAttrDesc: any;
  constructor(private httpClient: HttpClient,
    private CharacterDetails: CharacterDetailsApiService) { }

  ngOnInit(): void {
    this.loadDetails();
  }
  loadDetails() {
    this.CharacterDetails.getAll()
    .subscribe(cards => {
        this.cards = cards['results'];
       // console.log(this.cards);
      });
  }
  onDisplayModeChange(mode) {
    this.displayMode = mode;
  }

}
