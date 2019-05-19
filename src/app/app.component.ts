import { Component } from '@angular/core';
import { ExampleBehavioralSubjectService } from './shared-service/example-behavioral-subject.service';
import { Subscriber } from 'rxjs';

function getWindow(): any {
  return window;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'smartFrontEnd';

  constructor(private exampleBehavioralSubjectService: ExampleBehavioralSubjectService) {
    let window = getWindow();
    let config = {
      apiKey: "AIzaSyAAyiT1zLOnB3p-xqY7TkewcfE3bA2b9vU",
      authDomain: "smart-46249.firebaseapp.com",
      databaseURL: "https://smart-46249.firebaseio.com",
      projectId: "smart-46249",
      storageBucket: "smart-46249.appspot.com",
      messagingSenderId: "691879457930"
    };
    window.firebase.initializeApp(config);
  }

  testBehaviorSubject() {
    let subscriber = new Subscriber((value) => {console.log(`Got ${value}`)});
    let subscription = this.exampleBehavioralSubjectService.subscribe(subscriber);
    subscription.unsubscribe();
  }
}
