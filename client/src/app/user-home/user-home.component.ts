import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cuecard } from '../interfaces/cuecard';
import { CuecardService } from '../services/cuecard.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  cuecards: Cuecard[] = [];
  selectedCuecard?: Cuecard;
  isSelected: boolean = false;
  userId: string = this.route.snapshot.params['userId'];
  newCategory: string = "";
  newCoursename: string = "";
  newDescription: string = "";
  isEditingOrDeleting: boolean = false;
  selectedIndex?: number;


  constructor(private route: ActivatedRoute, private cuecardService: CuecardService) { }

  ngOnInit(): void {
    this.isSelected = false;
    this.getAllUserCuecards(this.userId);
  }

  onSelect(cuecard: Cuecard): void {
    this.selectedCuecard = cuecard;
    this.isSelected = true;
  }

  getAllUserCuecards(userId: string): void {
    this.cuecardService.getAllUserCuecards(userId)
      .subscribe(cuecards => this.cuecards = cuecards);
  }

  displayEditDelete(index: number): void {
    this.selectedIndex = index;
    this.isEditingOrDeleting = !this.isEditingOrDeleting;
  }

  deleteCuecard(cuecard: Cuecard) {
    if (confirm("Are you sure you want to delete this cue card?")) {
      this.cuecardService.deleteCuecard(cuecard, this.userId)
      .subscribe(cuecards => this.cuecards = cuecards);
    }
  }

}
