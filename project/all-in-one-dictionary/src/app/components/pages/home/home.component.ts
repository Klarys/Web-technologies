import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { MatRadioButton } from '@angular/material/radio';
import { DictionariesService } from 'src/app/services/dictionaries.service';
import { HttpErrorResponse } from '@angular/common/http';
import { WordsApiDefinition } from 'src/app/models/WordsApiDefinition.model';
import { element, ElementFinder } from 'protractor';
import { LinguaDefinitions } from 'src/app/models/LinguaDefinition.model';
import { TwinwordDefinitions } from 'src/app/models/TwinwordDefinitions.model';
import { OwlDefinitions } from 'src/app/models/OwlDefinitions.model';
import { WordsApiSynonyms } from 'src/app/models/WordsApiSynonyms.model';
import { LinguaSynonyms } from 'src/app/models/LinguaSynonym.model';
import { TwinwordSynonyms } from 'src/app/models/TwinwordSynonyms.model';
import { AuthService } from 'src/app/services/auth.service';
import { DefinitionRow } from 'src/app/models/list/DefinitionRow.model';
import { SavedDefinition } from 'src/app/models/saved/SavedDefinition.model';
import { OwlDefinitionRow } from 'src/app/models/list/OwlDefinitonRow.model';
import { SynonymRow } from 'src/app/models/list/SynonymRow.model';



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
  logedIn=false;
  word: string;
  searchForm: FormGroup;
  searched = false;
  scrolled = false;
  searchedWord: string;
  category: number =-1;

  definitionsLingua: DefinitionRow[];
  definitionsTwinword: DefinitionRow[] = [];
  definitionsWordsApi: DefinitionRow[] = [];
  definitionsOwl: OwlDefinitionRow[] = [];

  synonymsLingua: SynonymRow[] = [];
  synonymsTwinword: SynonymRow[] = [];
  synonymsWordsApi: SynonymRow[] = [];

  
  

  constructor(private dictionariesService: DictionariesService, private authService: AuthService) { 
    this.searchForm = new FormGroup({
      wordInput: new FormControl(null, [Validators.required]),
      category: new FormControl(1, [Validators.required])
    });
    this.logedIn = authService.isLogedIn();
  }

  ngOnInit(): void {
    window.addEventListener('scroll', this.scroll, true);
  }
  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }

  scroll = (event): void => {
    if(window.pageYOffset > 0)
    {
      this.scrolled = true;
    }
    else
    {
      this.scrolled = false;
    }
  };

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
              this.definitionsWordsApi.push({definition: element.definition, saved: false});
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
                    this.definitionsLingua.push({definition: element.definition, saved: false});
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
                this.definitionsTwinword.push({definition: element, saved: false});
              })
            }
            if(data.meaning.adverb != "")
            {
              var splitted = data.meaning.adverb.split("(adv)",1000);
              splitted.shift();
              splitted.forEach(element => {
                this.definitionsTwinword.push({definition: element, saved: false});
              })
            }
            if(data.meaning.noun != "")
            {
              var splitted = data.meaning.noun.split("(nou)",1000);
              splitted.shift();
              splitted.forEach(element => {
                this.definitionsTwinword.push({definition: element, saved: false});
              })
            }
            if(data.meaning.verb != "")
            {
              var splitted = data.meaning.verb.split("(vrb)",1000);
              splitted.shift();
              splitted.forEach(element => {
                this.definitionsTwinword.push({definition: element, saved: false});
              })
            }
          },
          (data: HttpErrorResponse) => {console.log('error!')}
        );
        
        this.dictionariesService.getOwlDefinitions(this.searchedWord).subscribe(
          (data: OwlDefinitions) => {
            data.definitions.forEach(element => {
              this.definitionsOwl.push({definition: element.definition, imageUrl: element.image_url, saved: false});
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
              this.synonymsWordsApi.push({synonym: element, saved: false});
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
                        this.synonymsLingua.push({synonym: synonym.toString(), saved: false});
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
                this.synonymsTwinword.push({synonym: element, saved: false});
              })
            }
          }
        )

        console.log(this.synonymsWordsApi);
        console.log(this.synonymsLingua);
      }
    }
  }


  onDefinitionSave(definion: DefinitionRow) {
    console.log(definion.definition);
    this.dictionariesService.SaveDefinition(this.searchedWord, definion.definition).subscribe(
    );
    definion.saved = true;
  }


  onSynonymSave(synonym: SynonymRow) {
    this.dictionariesService.SaveSynonym(this.searchedWord, synonym.synonym).subscribe(
      );
      synonym.saved = true;
  }

  clearAll() {
    this.definitionsLingua = [];
    this.definitionsTwinword = [];
    this.definitionsWordsApi = [];
    this.definitionsOwl = [];

    this.synonymsLingua = [];
    this.synonymsTwinword = [];
    this.synonymsWordsApi = [];
  }

  onScrollUp() {
    if(window.pageYOffset > 0)
    {
      console.log("lele");
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
    
  }

}
