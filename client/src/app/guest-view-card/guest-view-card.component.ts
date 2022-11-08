import { Component, Input, OnInit } from '@angular/core';
import { Cuecard } from '../interfaces/cuecard';
import { Module } from '../interfaces/module';
import { ModuleService } from '../services/module.service';

@Component({
  selector: 'app-guest-view-card',
  templateUrl: './guest-view-card.component.html',
  styleUrls: ['./guest-view-card.component.css']
})
export class GuestViewCardComponent implements OnInit {
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
  }
  
  fetchModule():void {
    if (this.cuecard) {
      this.moduleWasChanged = true;
      console.log(this.moduleWasChanged);
      this.questionNum = 0;
      this.getModule(this.cuecard.author, this.cuecard.courseName, this.selectedModule);
    }
  }

  getPrevQuestion(): void {
    if (this.questionNum > 0) {
      this.questionNum--;
    }
  }

  getNextQuestion(): void {
    if (this.questionNum < this.module.individualCards.length - 1) {
      this.questionNum++;
    }
  }

}
