import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { MatRadioButton } from '@angular/material/radio';
import { DictionariesService } from 'src/app/services/dictionaries.service';
import { HttpErrorResponse } from '@angular/common/http';
import { WordsApiDefinition } from 'src/app/models/WordsApiDefinition.model';
import { element } from 'protractor';


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
  category: number =-1;

  definitionsOxford: string[] = [];
  definitionsMerriam: string[] = [];
  definitionsWordsApi: string[] = [];
  definitionsOwl: string[] = [];

  synonymsOxford: string[] = [];
  synonymsMerriam: string[] = [];
  synonymsWordsApi: string[] = [];
  synonymsOwl: string[] = [];
  
  

  constructor(private dictionariesSerice: DictionariesService) { 
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
      this.category = this.searchForm.get('category').value;

      this.definitionsOxford = [];
      this.definitionsMerriam = [];
      this.definitionsWordsApi = [];
      this.definitionsOwl = [];

      this.synonymsOxford = [];
      this.synonymsMerriam = [];
      this.synonymsWordsApi = [];
      this.synonymsOwl = [];
      //TODO: wyszukiwanie

      this.dictionariesSerice.GetWordsAPIDefinitions(this.searchedWord).subscribe(
        (data: WordsApiDefinition) => {
          data.definitions.forEach(element => {
            this.definitionsWordsApi.push(element.definition);
          })
        },
        (data: HttpErrorResponse) => {console.log('error!')},
      );

      console.log(this.definitionsWordsApi);
      if(this.searchForm.get('category').value == 1)
      {
        this.definitionsOxford.push("def");
        
      }
      if(this.searchForm.get('category').value == 2)
      {
        this.synonymsOxford.push("syn");
      }
    }
  }

  onDefinitionSave(definion: string) {

  }

  onSynonymSave(synonym: string) {

  }

}
