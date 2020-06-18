import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DictionariesService } from 'src/app/services/dictionaries.service';
import { SavedDefinition } from 'src/app/models/saved/SavedDefinition.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-saved-definitions',
  templateUrl: './saved-definitions.component.html',
  styleUrls: ['./saved-definitions.component.css']
})
export class SavedDefinitionsComponent implements OnInit {
  logedIn=false;
  definitions: SavedDefinition[] = [];
  error: string = "";

  constructor(private authService: AuthService, private dictinariesService: DictionariesService) {
    this.logedIn = authService.isLoggedIn();
    if(this.logedIn)
    {
      this.dictinariesService.GetSavedDefinitions().subscribe(
        (data: SavedDefinition[]) => {
          this.error = "";
          if(data)
          {
            this.definitions = data;
          }
        },
        (error: HttpErrorResponse) => {
          this.error = "We are sorry, we encountered an error while getting your saved definitions.";
        }
      )
    }
   }

  ngOnInit(): void {
  }

  onDefinitionDelete (definition: SavedDefinition) {
    this.dictinariesService.DeleteDefinition(parseInt(definition.Id)).subscribe(
      (data: any) => {
        this.error = "";
        if(this.definitions.length == 1)
        {
          this.definitions.shift();
        }
        else if(this.definitions.length > 1)
        {
          const toDelete = (element: SavedDefinition) => element.Id == definition.Id;

          var index: number = this.definitions.findIndex(toDelete);
          
          if(index >= 0)
          {
            this.definitions.splice(index, 1);
          }
        }
        else
        {
          this.definitions = [];
        }
        
      },
      (error: HttpErrorResponse) => {
        this.error = "We are sorry, we encountered an error while deleting the selected definition. Please try again.";
      }
      
    );
  }
}
