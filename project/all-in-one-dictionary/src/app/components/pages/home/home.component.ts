import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { MatRadioButton } from '@angular/material/radio';
import { DictionariesService } from 'src/app/services/dictionaries.service';
import { HttpErrorResponse } from '@angular/common/http';
import { WordsApiDefinition } from 'src/app/models/WordsApiDefinition.model';
import { element, ElementFinder } from 'protractor';
import { LinguaDefinitions } from 'src/app/models/LinguaDefinition.module';
import { TwinwordDefinitions } from 'src/app/models/TwinwordDefinitions.model';
import { OwlDefinitions } from 'src/app/models/OwlDefinitions.model';
import { WordsApiSynonyms } from 'src/app/models/WordsApiSynonyms.model';
import { LinguaSynonyms } from 'src/app/models/LinguaSynonym.module';
import { TwinwordSynonyms } from 'src/app/models/TwinwordSynonyms.model';


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

  definitionsLingua: string[] = [];
  definitionsTwinword: string[] = [];
  definitionsWordsApi: string[] = [];
  definitionsOwl: string[] = [];

  synonymsLingua: string[] = [];
  synonymsTwinword: string[] = [];
  synonymsWordsApi: string[] = [];
  synonymsOwl: string[] = [];
  
  

  constructor(private dictionariesService: DictionariesService) { 
    this.searchForm = new FormGroup({
      wordInput: new FormControl(null, [Validators.required]),
      category: new FormControl(1, [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  onAccept() { //TODO - OBSLUGA BLEDOW PRZY LOSOWYM CIAGU ZNAKOW (NIEISTNIEJACE SŁOWO)
    if(this.searchForm.valid)
    {
      this.searched = true;
      this.searchedWord = this.searchForm.get("wordInput").value;
      this.category = this.searchForm.get('category').value;

      this.clearAll();
      
      if(this.category == 1) //wyszukiwanie definicji
      {
        this.dictionariesService.GetWordsAPIDefinitions(this.searchedWord).subscribe(
          (data: WordsApiDefinition) => {
            data.definitions.forEach(element => {
              this.definitionsWordsApi.push(element.definition);
            })
          },
          (data: HttpErrorResponse) => {console.log('error!')}
        );
  
        this.dictionariesService.GetLinguaDefinitions(this.searchedWord).subscribe(
          (data: LinguaDefinitions) => {
            if(data.entries.length > 0)
            {
              data.entries[0].lexemes.forEach(lex => {
                if(lex.senses !== undefined)
                {
                  lex.senses.forEach(element => {
                    this.definitionsLingua.push(element.definition);
                  })
                }
              })
              
            }
          },
          (data: HttpErrorResponse) => {console.log('error!')}
        );
  
  
        this.dictionariesService.getTwinwordDefinitions(this.searchedWord).subscribe(
          (data: TwinwordDefinitions) => {
            console.log(data);
            if(data.meaning.adjective != "")
            {
              
              var splitted = data.meaning.adjective.split("(adj)",1000);
              splitted.shift();
              splitted.forEach(element => {
                this.definitionsTwinword.push(element);
              })
            }
            if(data.meaning.adverb != "")
            {
              var splitted = data.meaning.adverb.split("(adv)",1000);
              splitted.shift();
              splitted.forEach(element => {
                this.definitionsTwinword.push(element);
              })
            }
            if(data.meaning.noun != "")
            {
              var splitted = data.meaning.noun.split("(nou)",1000);
              splitted.shift();
              splitted.forEach(element => {
                this.definitionsTwinword.push(element);
              })
            }
            if(data.meaning.verb != "")
            {
              var splitted = data.meaning.verb.split("(vrb)",1000);
              splitted.shift();
              splitted.forEach(element => {
                this.definitionsTwinword.push(element);
              })
            }
          },
          (data: HttpErrorResponse) => {console.log('error!')}
        );
        
        this.dictionariesService.getOwlDefinitions(this.searchedWord).subscribe(
          (data: OwlDefinitions) => {
            data.definitions.forEach(element => {
              this.definitionsOwl.push(element.definition);
            })
          },
          (data: HttpErrorResponse) => {console.log('error!')}
        )
  
        console.log(this.definitionsLingua);
        console.log(this.definitionsWordsApi);
        console.log(this.definitionsOwl);
      }
      else if(this.category == 2) { //wyszukiwanie synonimów

        this.dictionariesService.getWordsAPISynonyms(this.searchedWord).subscribe(
          (data: WordsApiSynonyms) => {
            
            data.synonyms.forEach(element => {
              this.synonymsWordsApi.push(element);
            })
          },
          (data: HttpErrorResponse) => {console.log('error!')}
        )
        
        this.dictionariesService.GetLinguaSynonyms(this.searchedWord).subscribe(
          (data: LinguaSynonyms) => {
            if(data.entries.length > 0)
            {
              data.entries[0].lexemes.forEach(lex => {
                if(lex.synonymSets!== undefined)
                {
                  lex.synonymSets.forEach(element => {
                    if(element.synonyms)
                    {
                      element.synonyms.forEach(synonym => {
                        this.synonymsLingua.push(synonym.toString());
                      });
                    }
                  });
                }
              });
            }
          },
          (data: HttpErrorResponse) => {console.log('error!')}
        );

        this.dictionariesService.GetTwinwordSynonyms(this.searchedWord).subscribe( 
          (data: TwinwordSynonyms) => {

            if(data.relation.synonyms != "")
            {
              var splitted = data.relation.synonyms.split(", ",1000);
              splitted.forEach(element => {
                this.synonymsTwinword.push(element);
              })
            }
          }
        )

        console.log(this.synonymsWordsApi);
        console.log(this.synonymsLingua);
      }
    }
  }

  onDefinitionSave(definion: string) {

  }

  onSynonymSave(synonym: string) {

  }

  clearAll() {
    this.definitionsLingua = [];
    this.definitionsTwinword = [];
    this.definitionsWordsApi = [];
    this.definitionsOwl = [];

    this.synonymsLingua = [];
    this.synonymsTwinword = [];
    this.synonymsWordsApi = [];
    this.synonymsOwl = [];
  }

}
