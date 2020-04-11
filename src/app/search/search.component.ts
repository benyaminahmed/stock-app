import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchInput: string;
  searchForm: FormGroup;

  ngOnInit(): void {

    this.searchForm = new FormGroup({
      searchCtrl: new FormControl('')
    });
  }

  onChangeSearch(event) {
    this.searchInput = event.currentTarget.value;
  }

}
