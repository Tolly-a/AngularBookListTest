import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showBookList: boolean = false;
  
  constructor(private router: Router) {}
  
  onShowBooks(){
    if(!this.showBookList)
    {
      this.router.navigate(['/book-list']);
      this.showBookList = true;
    } 
    else {
      this.router.navigate(['/']);
      this.showBookList = false;
    }
  }

}
