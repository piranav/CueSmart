import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cuecard } from '../interfaces/cuecard';
import { CuecardService } from '../services/cuecard.service';

@Component({
  selector: 'app-edit-cuecard',
  templateUrl: './edit-cuecard.component.html',
  styleUrls: ['./edit-cuecard.component.css']
})
export class EditCuecardComponent implements OnInit {
  cuecards: Cuecard[] = [];
  userId: string = this.route.snapshot.params['userId'];
  newCategory: string = "";
  newCoursename: string = "";
  newDescription: string = "";
  oldCourseName: string = "";
  cuecardToEdit?: Cuecard;
  
  constructor(private route: ActivatedRoute, private cuecardService: CuecardService) { }

  // populate edit fields with existing data using author/coursename info in URL
  ngOnInit(): void {
    // remove any '%20' from URL and replace with spaces
    let formattedCourseName = "";
    for (let i = 0; i < this.route.snapshot.params['courseName'].length; i++) {
      // if we run into '%20' in the URL, replace with space char
      if (this.route.snapshot.params['courseName'][i] === '%' && 
          this.route.snapshot.params['courseName'][i+1] === '2' && 
          this.route.snapshot.params['courseName'][i+2] === '0') 
      {
        formattedCourseName += ' ';
        i += 3;
      } else {
        formattedCourseName += this.route.snapshot.params['courseName'][i];
      }
    }

    // get existing info about cuecard
    this.cuecardService.getOneCuecard(this.route.snapshot.params['userId'], formattedCourseName)
      .subscribe(cuecard => this.cuecardToEdit = cuecard);
    if (this.cuecardToEdit) {
      this.newCategory = this.cuecardToEdit.category;
      this.newCoursename = this.cuecardToEdit.courseName;
      this.oldCourseName = this.cuecardToEdit.courseName; // save old coursename so we can identify which cuecard to edit in the db
      this.newDescription = this.cuecardToEdit.description;
    }
  }

  editCuecard(): void {
    // make sure entries aren't blank
    if (this.cuecardToEdit && this.newCategory != "" && this.newCoursename != "" && this.newDescription != "") {
        this.cuecardService.editCuecard(this.cuecardToEdit, this.newCategory, this.newCoursename, this.newDescription)
        .subscribe(cuecards => this.cuecards = cuecards); // edit existing cuecard
    } else {
      alert("Please enter values for all fields");
    }
  }

}
