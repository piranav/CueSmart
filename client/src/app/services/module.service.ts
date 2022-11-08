import { Injectable } from '@angular/core';
import { Module} from '../interfaces/module';
import { MODULES } from '../mockData/mock-modules';
import { Observable, of } from 'rxjs';
import { Cuecard } from '../interfaces/cuecard';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  module: Module = {
    courseName: '', 
    author: '', 
    number: 0,
    dateCreated: new Date(Date.now()),
    individualCards: []
  };

  constructor() { }

  /* this function grabs the selected module for a given course and returns to front end */
  /* assumes an author & coursename are what make a set of cue cards unique... ie authors cannot have more than more than 1 set of cuecards with the same coursename */
  getModule(author: string, courseName: string, number: number): Observable<Module> {
    
    // TODO: Instead of grabbing the modules from the mock-modules file, we need to make a call here to the database and return the correct modules
    
    for (let i = 0; i < MODULES.length; i++) {
      if (MODULES[i].author === author && MODULES[i].courseName === courseName && MODULES[i].number === number) {
        this.module = MODULES[i];
        break;
      }
    }
    return of(this.module);
  }

  // returns array of remaining individualCards after one was deleted
  deleteCard(author: string, courseName: string, number: number, cardIndex: number): Observable<Module> {
    
    // TODO: actually delete this card in the database instead of my temp solution below
    
    // find correct module to remove a card from
    for (let i = 0; i < MODULES.length; i++) {
      if (MODULES[i].author === author && MODULES[i].courseName === courseName && MODULES[i].number === number) {
        this.module = MODULES[i];
        break;
      }
    }

    // remove card at current question num index
    this.module.individualCards.splice(cardIndex, 1);

    return of(this.module);
  }

  addCard(module: Module, index: number): Observable<Module> {

    // TODO: add dummy card to database which can later be edited instead of my temp solution below

    const newIndividualCard = ["type your term here", "type your answer here"]; // default data to be displayed in UI, then user can edit
    module.individualCards.splice(index, 0, newIndividualCard); // add new card to array within module
    this.module = module;

    return of(this.module);
  }

  editCard(module: Module, question: string, answer: string, index: number): Observable<Module> {

    // TODO: actually edit the correct individual card Q & A instead of my temp solution below

    module.individualCards[index] = [question, answer];
    this.module = module;

    return of(this.module);
  }

  deleteModule(modToDelete: Module, cuecard: Cuecard): Observable<Cuecard> {
    // TODO: actually delete module from db AND update cuecard numModules in db
    
    // find module to delete
    for (let i = 0; i < MODULES.length; i++) {
      if (MODULES[i] == modToDelete) {
        MODULES.splice(i, 1);
        break;
      }
    }
    cuecard.numModules--;
    return of(cuecard);
  }

  addModule(cuecard: Cuecard): Observable<Cuecard> {
    // TODO: actually add module to database AND update cuecard numModules in db
    const module = {
      courseName: cuecard.courseName, 
      author: cuecard.author, 
      number: cuecard.numModules+1,
      dateCreated: new Date(Date.now()),
      individualCards: [
        [
          "type your term here",
          "type your answer here"
        ]
      ]
    }

    MODULES.push(module);

    cuecard.numModules++;
    return of(cuecard);
  }

}
