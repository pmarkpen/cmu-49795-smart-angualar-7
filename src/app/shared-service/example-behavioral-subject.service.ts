import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscriber, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExampleBehavioralSubjectService {
  behaviorSubject: BehaviorSubject<String>;
  constructor() { 
    this.behaviorSubject = new BehaviorSubject<String>("");
  }

  subscribe(subscriberObj: Subscriber<String>): Subscription {
    return this.behaviorSubject.subscribe(subscriberObj);
  }

  emit(strValue: String) {
    this.behaviorSubject.next(strValue);
  }


}
