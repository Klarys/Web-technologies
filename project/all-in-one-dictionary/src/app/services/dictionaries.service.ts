import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators'
import { WordsApiDefinition } from '../models/WordsApiDefinition.model';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class DictionariesService {

    constructor(private http: HttpClient) {}

    GetWordsAPIDefinitions(word: string): Observable<WordsApiDefinition> {
        return this.http.get<WordsApiDefinition>(environment.WordApiUrl + word + '/definitions',
        {
            headers: new HttpHeaders({
                'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
                'x-rapidapi-key': '0440ffb3b5msh31f194ee363852fp13e7bdjsndeacfeb78db4'
            })
        });
    }
}