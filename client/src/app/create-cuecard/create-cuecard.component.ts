import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cuecard } from '../interfaces/cuecard';
import { CuecardService } from '../services/cuecard.service';

@Component({
  selector: 'app-create-cuecard',
  templateUrl: './create-cuecard.component.html',
  styleUrls: ['./create-cuecard.component.css']
})
export class CreateCuecardComponent implements OnInit {
  cuecards: Cuecard[] = [];
  userId: string = this.route.snapshot.params['userId'];
  newCategory: string = "";
  newCoursename: string = "";
  newDescription: string = "";

  constructor(private route: ActivatedRoute, private cuecardService: CuecardService) { }

  ngOnInit(): void {
  }

  addNewCuecard(): void {
    // make sure entries aren't blank
    if (this.newCategory != "" && this.newCoursename != "" && this.newDescription != "") {
      // make sure author doesn't already have a course name with entered title
      if (!this.cuecardService.courseAlreadyExists(this.userId, this.newCoursename)) {
        this.cuecardService.addNewCuecard(this.newCategory, this.userId, this.newCoursename, this.newDescription)
        .subscribe(cuecards => this.cuecards = cuecards); // add new cuecard
      } else {
        alert("Course name already exists!");
      }
     
    } else {
      alert("Please enter values for all fields");
    }
  }

}
