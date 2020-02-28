import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularAssignment';
  selectedFilter;
  filteredVal(event) {
    this.selectedFilter = event;
    
   // console.log(this.selectedFilter);
  }
}
