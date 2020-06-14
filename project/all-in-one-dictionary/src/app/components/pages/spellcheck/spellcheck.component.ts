import { Component, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective, NgForm, FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { SpellcheckService } from 'src/app/services/spellcheck.service';
import { SpellcheckResponse } from 'src/app/models/spellcheck/SpellcheckResponse.model';
import { HttpErrorResponse } from '@angular/common/http';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-spellcheck',
  templateUrl: './spellcheck.component.html',
  styleUrls: ['./spellcheck.component.css']
})
export class SpellcheckComponent implements OnInit {

  spellcheckForm: FormGroup;
  buttonClicked = false;
  correctedText: string = "";

  constructor(private spellcheckService: SpellcheckService) { 
    this.spellcheckForm = new FormGroup({
      textInput: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  onAccept() {
    if(this.spellcheckForm.valid)
    {
      console.log(this.spellcheckForm.get('textInput').value);
      this.spellcheckService.CheckText(this.spellcheckForm.get('textInput').value).subscribe(
        (data: SpellcheckResponse) => {
          if(data)
          {
            this.correctedText = data.suggestion;
          }
        },
        (error: HttpErrorResponse) => {this.correctedText = "An error occurred. We are sorry 😔. Try again later!"}
      );
      this.buttonClicked = true;
    }
  }
}
