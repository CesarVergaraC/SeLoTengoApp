import { Component } from '@angular/core';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDkl9Wu5H_LziKoXgiuAtLEOJr3Bt5D3fE",
  authDomain: "programacionmovilcrud.firebaseapp.com",
  databaseURL: "https://programacionmovilcrud-default-rtdb.firebaseio.com",
  projectId: "programacionmovilcrud",
  storageBucket: "programacionmovilcrud.firebasestorage.app",
  messagingSenderId: "252636061552",
  appId: "1:252636061552:web:06573715587c34e1c779b5"
};

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor() {
    initializeApp(firebaseConfig);
  }
}
