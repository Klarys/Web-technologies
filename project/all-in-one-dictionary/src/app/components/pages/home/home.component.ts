import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { MatRadioButton } from '@angular/material/radio';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  word: string;
  searchForm: FormGroup;
  searched = false;
  searchedWord: string;

  resultsOxford: string[] = [];
  resultsMerriam: string[] = [];
  resultsWordsApi: string[] = [];
  resultsOwl: string[] = [];
  
  

  constructor() { 
    this.searchForm = new FormGroup({
      wordInput: new FormControl(null, [Validators.required]),
      category: new FormControl(1, [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  onAccept() {
    if(this.searchForm.valid)
    {
      this.searched = true;
      this.searchedWord = this.searchForm.get("wordInput").value;
      //TODO: wyszukiwanie


    }
  }

  onDefinitionSave(definion: string) {

  }

}
