import { Component, OnInit } from '@angular/core';
import { Cuecard } from '../interfaces/cuecard';
import { CuecardService } from '../services/cuecard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cuecards: Cuecard[] = [];
  search: string = "";
  selectedCuecard?: Cuecard;
  isSelected: boolean = false;

  constructor(private cuecardService: CuecardService) { }

  ngOnInit(): void {
    this.isSelected = false;
    this.getAllCuecards();
  }

  onSelect(cuecard: Cuecard): void {
    this.isSelected = true;
    this.selectedCuecard = cuecard;
  }

  getAllCuecards(): void {
    this.cuecardService.getAllCuecards()
      .subscribe(cuecards => this.cuecards = cuecards);
  }

  searchCuecards(): void {
    this.cuecardService.searchCuecards(this.search)
      .subscribe(cuecards => this.cuecards = cuecards);
  }

  setIsSelectedToFalse(): void {
    this.isSelected = false;
  }
  

}
