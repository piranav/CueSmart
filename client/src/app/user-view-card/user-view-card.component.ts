import { Component, Input, OnInit } from '@angular/core';
import { Cuecard } from '../interfaces/cuecard';
import { Module } from '../interfaces/module';
import { ModuleService } from '../services/module.service';


@Component({
  selector: 'app-user-view-card',
  templateUrl: './user-view-card.component.html',
  styleUrls: ['./user-view-card.component.css']
})

export class UserViewCardComponent implements OnInit {
  @Input() cuecard?: Cuecard;

  module: Module = { //dummy module to avoid errors, stores module info for selected module from currently cuecard after ngOnInit runs
    courseName: '', 
    author: '', 
    number: 0,
    dateCreated: new Date(Date.now()),
    individualCards: []
  };
  selectedModule = 1; // grabs module number from dropdown
  questionNum = 0; // start with first question
  moduleWasChanged = false;
  currentQuestion: string = "";
  currentAnswer: string = "";
  isEditMode: boolean = false;

  constructor(private moduleService: ModuleService) { }

  ngOnInit(): void { }

  // forces page to populate with mod 1 data on initial load
  ngAfterContentChecked(): void {
    if (!this.moduleWasChanged) {
      this.fetchModule();
    }
  }

  // counter fxn to turn numModules into an array that ngFor can iterate to display select dropdown
  counter(i: number) {
    return new Array(i);
  }

  getModule(author: string, courseName: string, number: number): void {
    this.moduleService.getModule(author, courseName, number)
      .subscribe(module => this.module = module);
    this.currentQuestion = this.module.individualCards[this.questionNum][0];
    this.currentAnswer = this.module.individualCards[this.questionNum][1];
  }
  
  fetchModule():void {
    if (this.cuecard) {
      this.moduleWasChanged = true;
      this.questionNum = 0;
      this.getModule(this.cuecard.author, this.cuecard.courseName, this.selectedModule);
    }
  }

  addModule(): void {
    if (this.cuecard) {
      this.moduleService.addModule(this.cuecard)
        .subscribe(cuecard => this.cuecard = cuecard);
      this.selectedModule = this.cuecard.numModules;
      this.fetchModule(); // refresh page to update displayed cuecards
      this.isEditMode = true;
    }
  }

  deleteModule(): void {
    if (this.cuecard && confirm("Are you sure you want to delete this module?")) {
      this.moduleService.deleteModule(this.module, this.cuecard)
        .subscribe(cuecard => this.cuecard = cuecard);
      this.selectedModule = 1;
      this.fetchModule();
    }
  }

  getPrevQuestion(): void {
    if (this.questionNum > 0) {
      this.questionNum--;
      this.currentQuestion = this.module.individualCards[this.questionNum][0];
      this.currentAnswer = this.module.individualCards[this.questionNum][1];
    }
  }

  getNextQuestion(): void {
    if (this.questionNum < this.module.individualCards.length - 1) {
      this.questionNum++;
      this.currentQuestion = this.module.individualCards[this.questionNum][0];
      this.currentAnswer = this.module.individualCards[this.questionNum][1];
    }
  }

  editCard(isAutomaticUpdate = true): void {
    // if this function is being called by changing the input text inside of the textareas, update with that info
    if (isAutomaticUpdate) {
      this.moduleService.editCard(this.module, this.currentQuestion, this.currentAnswer, this.questionNum)
        .subscribe(module => this.module = module);
    } else {
      // if this call is happening because the user clicked on the edit icon (ie, wants to edit the title of the individual card but needs the flip effect turned off)
      this.isEditMode = true;
    }
    
  }

  deleteCard(): void {
    if (this.cuecard && this.module.individualCards.length > 1) {
      this.moduleService.deleteCard(this.cuecard.author, this.cuecard.courseName, this.selectedModule, this.questionNum)
        .subscribe(module => this.module = module);
      this.currentQuestion = this.module.individualCards[this.questionNum][0];
      this.currentAnswer = this.module.individualCards[this.questionNum][1];
    }
  }  

  // adds a new blank card with question as "type your term here" and answer as "type your answer here"
  // also saves user's change when they edit the term (had to pause flip effect with isEditMode to do this)
  addCard(isEditMode: boolean): void {
    if (!isEditMode) {
      this.moduleService.addCard(this.module, this.questionNum+1)
        .subscribe(module => this.module = module);
      this.questionNum++;
      this.isEditMode = true;
      this.currentQuestion = this.module.individualCards[this.questionNum][0];
      this.currentAnswer = this.module.individualCards[this.questionNum][1];
    } else {
      // means we are confirming the question input text as the button switches from a yellow plus to a green check
      this.isEditMode = false;
    }
  }

}


