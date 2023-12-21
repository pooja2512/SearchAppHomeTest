import { Component, OnInit } from '@angular/core';
import { SearchContentService } from '../Services/search-content.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchTerm: string = '';
  searchResults: any[] = [];
  showErrorAlert: boolean = false;
  ErrorMessage: string = '';

  constructor(private searchService: SearchContentService) { }

  ngOnInit(): void {
  }

  search() {
    if (this.searchResults) {
      this.searchResults = [];
    }
    this.searchService.searchPeople(this.searchTerm).subscribe((data: any[]) => {
      this.searchResults = data;
    },
      (error: any) => {
        this.showErrorAlert = true;
        if (error.status === 400) {
          this.ErrorMessage = error.error.errors.searchTerm[0];
        } else {
          this.ErrorMessage = 'An unexpected error occurred';
        }
      });
  }

  closeAlert() {
    this.showErrorAlert = false;
  }

}
