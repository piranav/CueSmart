import { Injectable } from '@angular/core';
import { Cuecard } from '../interfaces/cuecard';
import { CUECARDS } from '../mockData/mock-cuecards';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuecardService {

  constructor() { }

  getAllCuecards(): Observable<Cuecard[]> {
    // TODO: Instead of grabbing the cue cards from the mock-cuecards file, we need to make a call here to the database and return all cue cards
    const cuecards = of(CUECARDS);
    return cuecards;
  }


  getAllUserCuecards(userId: string): Observable<Cuecard[]> {
    const cuecards = CUECARDS.filter((cuecard) => {
      return (
        cuecard.author === userId
      );
    });
    return of(cuecards);
  }


  getOneCuecard(userId: string, courseName: string): Observable<Cuecard> {
    const cuecards = CUECARDS.filter((cuecard) => {
      return (
        cuecard.author.toLowerCase() === userId.toLowerCase() && 
        cuecard.courseName.toLowerCase() === courseName.toLowerCase()
      );
    });

    return of(cuecards[0]);
  }


  searchCuecards(searchString: string): Observable<Cuecard[]> {
    // TODO: Fetch data using database, not from mock file
    const cuecards = CUECARDS.filter((cuecard) => {
      return (
        cuecard.courseName.toLowerCase().includes(searchString.toLowerCase()) ||
        cuecard.category.toLowerCase().includes(searchString.toLowerCase()) ||
        cuecard.author.toLowerCase().includes(searchString.toLowerCase()) ||
        cuecard.dateCreated.toDateString().includes(searchString) ||
        cuecard.description.toLowerCase().includes(searchString.toLowerCase()) ||
        cuecard.numModules.toString().includes(searchString)
      );
    });
    return of(cuecards);
  }


  addNewCuecard(category: string, author: string, coursename: string, description: string): Observable<Cuecard[]> {
    const newCuecard = {
      courseName: coursename,
      category: category,
      author: author,
      description: description,
      dateCreated: new Date(),
      numModules: 1 // start each new cuecard with 1 module, then user can create more later on
    }

    // TODO: actually add a new cuecard to the database

    CUECARDS.push(newCuecard);
    console.log(CUECARDS);
    return of(CUECARDS);
  }


  courseAlreadyExists(userId: string, courseName: string): boolean {
    // TODO: make call to db to get all cuecards

    // this grabs cuecards from mock data file that match the author and coursename provided, empty [] if no match
    const cuecards = CUECARDS.filter((cuecard) => {
      return (
        cuecard.author.toLowerCase() === userId.toLowerCase() && cuecard.courseName.toLowerCase() === courseName.toLowerCase()
      );
    });
    // if there are 1 or more cuecards that match the criteria, then a cuecard with that author and title already exists
    return cuecards.length > 0; 
  }


  editCuecard(oldCuecard: Cuecard, newCategory: string, newCoursename: string, newDescription: string): Observable<Cuecard[]> {
    // TODO: grab cuecard from db using oldCuecard coursename and author properties, return updated array of cuecards

    // grab old cuecard & update
    for (let i = 0; i < CUECARDS.length; i++) {
      if (CUECARDS[i].author.toLowerCase() === oldCuecard.author.toLowerCase() && 
          CUECARDS[i].courseName.toLowerCase() === oldCuecard.courseName.toLowerCase()) 
      {
        CUECARDS[i].category = newCategory;
        CUECARDS[i].courseName = newCoursename;
        CUECARDS[i].description = newDescription;
      }
    }

    return of(CUECARDS);
  }


  deleteCuecard(cuecardToDelete: Cuecard, userId: string): Observable<Cuecard[]> {
    // TODO: actually delete cuecard from db

    // grab all cuecards that belong to user
    let cuecards = CUECARDS.filter((cuecard) => {
      return (
        cuecard.author === userId
      );
    });

    for (let i = 0; i < cuecards.length; i++) {
      if (cuecards[i] === cuecardToDelete) 
      {
        cuecards.splice(i, 1);
        break;
      }
    }
    return of(cuecards);
  }
}
