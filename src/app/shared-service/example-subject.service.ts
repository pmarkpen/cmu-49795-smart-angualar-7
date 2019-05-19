import { Injectable } from '@angular/core';
import { Subject, Subscriber, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExampleSubjectService {
  subject: Subject<String>;
  constructor() { 
    this.subject = new Subject<String>(); 
  }

  subscribe(subscriberObj:Subscriber<String>): Subscription {
    return this.subject.subscribe(subscriberObj);
  }

  next(value:String) {
    this.subject.next(value);
  }
}
