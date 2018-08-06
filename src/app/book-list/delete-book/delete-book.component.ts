import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../../shared/services/data.service';
import { InformationService } from '../../shared/services/information.service';



@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.css']
})
export class DeleteBookComponent implements OnInit {
  closeResult: string;
  bookId: string;
  selectedBook: any;
  @ViewChild('deleteModal') deleteModal;

  constructor(private modalService: NgbModal,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private infoService: InformationService) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(routeParams => this.loadBookById(routeParams.id));
  }

  private loadBookById(bookId: string) {
    this.dataService.getBookById(bookId).subscribe((data) => {
      this.selectedBook = data;
      if (this.selectedBook !== null)
        this.openModal();
    })
  }

  deleteBook() {
    this.dataService.deleteBook(this.selectedBook.id).subscribe((res) => {
      this.infoService.setData('book was deleted');
      this.router.navigate(['/book-list']);
    })
  }


  openModal() {
    this.modalService.open(this.deleteModal).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.BACKDROP_CLICK || reason === 'cancel click' || reason === ModalDismissReasons.ESC) {
      this.router.navigate(['/book-list']);
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


}
