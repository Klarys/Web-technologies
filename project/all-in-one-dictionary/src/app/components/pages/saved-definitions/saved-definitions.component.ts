import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DictionariesService } from 'src/app/services/dictionaries.service';
import { SavedDefinition } from 'src/app/models/saved/SavedDefinition.model';

@Component({
  selector: 'app-saved-definitions',
  templateUrl: './saved-definitions.component.html',
  styleUrls: ['./saved-definitions.component.css']
})
export class SavedDefinitionsComponent implements OnInit {
  logedIn=false;
  definitions: SavedDefinition[] = [];

  constructor(private authService: AuthService, private dictinariesService: DictionariesService) {
    this.logedIn = authService.isLogedIn();
    if(this.logedIn)
    {
      this.dictinariesService.GetSavedDefinitions().subscribe(
        (data: SavedDefinition[]) => {
          if(data)
          {
            console.log(data);
            this.definitions = data;
          }
        }
      )
    }
   }

  ngOnInit(): void {
  }

  onDefinitionDelete (definition: SavedDefinition) {console.log(definition.Word);}
}
