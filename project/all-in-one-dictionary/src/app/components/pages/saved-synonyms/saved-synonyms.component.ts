import { Component, OnInit } from '@angular/core';
import { SavedSynonym } from 'src/app/models/saved/SavedSynonym.model';
import { AuthService } from 'src/app/services/auth.service';
import { DictionariesService } from 'src/app/services/dictionaries.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-saved-synonyms',
  templateUrl: './saved-synonyms.component.html',
  styleUrls: ['./saved-synonyms.component.css']
})
export class SavedSynonymsComponent implements OnInit {

  logedIn=false;
  synonyms: SavedSynonym[] = [];

  constructor(private authService: AuthService, private dictinariesService: DictionariesService) {
    this.logedIn = authService.isLoggedIn();
    if(this.logedIn)
    {
      this.dictinariesService.GetSavedSynonyms().subscribe(
        (data: SavedSynonym[]) => {
          if(data)
          {
            console.log(data);
            this.synonyms = data;
          }
        }
      )
    }
   }

  ngOnInit(): void {
  }

  onSynonymDelete (synonym: SavedSynonym) {
    this.dictinariesService.DeleteSynonym(parseInt(synonym.Id)).subscribe(
      (data: any) => {
        if(this.synonyms.length == 1)
        {
          this.synonyms.shift();
        }
        else if(this.synonyms.length > 1)
        {
          const toDelete = (element: SavedSynonym) => element.Id == synonym.Id;

          var index: number = this.synonyms.findIndex(toDelete);
          
          if(index >= 0)
          {
            this.synonyms.splice(index, 1);
          }
        }
        else
        {
          this.synonyms = [];
        }
        
      },
      (error: HttpErrorResponse) => {console.log("error!");}
      
    );
  }
}
