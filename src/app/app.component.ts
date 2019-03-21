import { Component } from '@angular/core';

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

  constructor() {
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
}
