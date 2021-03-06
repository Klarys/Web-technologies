import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators'
import { WordsApiDefinition } from '../models/WordsApiDefinition.model';
import { Observable } from 'rxjs';
import { LinguaDefinitions } from '../models/LinguaDefinition.model';
import { TwinwordDefinitions } from '../models/TwinwordDefinitions.model';
import { OwlDefinitions } from '../models/OwlDefinitions.model';
import { WordsApiSynonyms } from '../models/WordsApiSynonyms.model';
import { LinguaSynonyms } from '../models/LinguaSynonym.model';
import { TwinwordSynonyms } from '../models/TwinwordSynonyms.model';
import { SavedDefinition } from '../models/saved/SavedDefinition.model';
import { SavedSynonym } from '../models/saved/SavedSynonym.model';

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

    GetLinguaDefinitions(word: string): Observable<LinguaDefinitions> {
        return this.http.get<LinguaDefinitions>(environment.LinguaUrl + word,
        {
            headers: new HttpHeaders({
                'x-rapidapi-host': 'lingua-robot.p.rapidapi.com',
                'x-rapidapi-key': '0440ffb3b5msh31f194ee363852fp13e7bdjsndeacfeb78db4'
            })
        });
    }

    getTwinwordDefinitions(word: string): Observable<TwinwordDefinitions> {
        return this.http.get<TwinwordDefinitions>(environment.TwinwordUrl + "definition/",
        {
            headers: new HttpHeaders({
                'x-rapidapi-host': 'twinword-word-graph-dictionary.p.rapidapi.com',
                'x-rapidapi-key': '0440ffb3b5msh31f194ee363852fp13e7bdjsndeacfeb78db4'
            }),
            params: {
                'entry': word.toString()
            }
        });
    }

    getOwlDefinitions(word:string): Observable<OwlDefinitions> {
        return this.http.get<OwlDefinitions>(environment.OwlUrl + word,
            {
                headers: new HttpHeaders({'Authorization': 'Token 125f116a62cfc0cdb561d3c684965669a5e03731'})
            });
        
    }

    getWordsAPISynonyms(word: string):Observable<WordsApiSynonyms> {
        return this.http.get<WordsApiSynonyms>(environment.WordApiUrl + word + '/synonyms',
        {
            headers: new HttpHeaders({
                'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
                'x-rapidapi-key': '0440ffb3b5msh31f194ee363852fp13e7bdjsndeacfeb78db4'
            })
        });
    }

    GetLinguaSynonyms(word: string): Observable<LinguaSynonyms> {
        return this.http.get<LinguaSynonyms>(environment.LinguaUrl + word,
        {
            headers: new HttpHeaders({
                'x-rapidapi-host': 'lingua-robot.p.rapidapi.com',
                'x-rapidapi-key': '0440ffb3b5msh31f194ee363852fp13e7bdjsndeacfeb78db4'
            })
        });
    }

    GetTwinwordSynonyms(word: string): Observable<TwinwordSynonyms> {
        return this.http.get<TwinwordSynonyms>(environment.TwinwordUrl + "reference/",
        {
            headers: new HttpHeaders({
                'x-rapidapi-host': 'twinword-word-graph-dictionary.p.rapidapi.com',
                'x-rapidapi-key': '0440ffb3b5msh31f194ee363852fp13e7bdjsndeacfeb78db4'
            }),
            params: {
                'entry': word.toString()
            }
        });
    }

    GetSavedDefinitions(): Observable<SavedDefinition[]> {
        return this.http.get<SavedDefinition[]>(environment.NodeJSUrl + "definitions", {
            headers: new HttpHeaders({
                Authorization: 'Bearer '+ localStorage.getItem('token')
            })
        });
    }

    SaveDefinition(word: string, definition: string) {
        const body = {
            word: word,
            definition: definition
        };
        return this.http.post(environment.NodeJSUrl + "definitions", body,{
            headers: new HttpHeaders({
                Authorization: 'Bearer '+ localStorage.getItem('token')
            })
        });
    }

    DeleteDefinition(id: number) {
        return this.http.delete(environment.NodeJSUrl + "definitions/" + id, {
            headers: new HttpHeaders({
                Authorization: 'Bearer '+ localStorage.getItem('token')
            })
        });
    }


    GetSavedSynonyms(): Observable<SavedSynonym[]> {
        return this.http.get<SavedSynonym[]>(environment.NodeJSUrl + "synonyms/", {
            headers: new HttpHeaders({
                Authorization: 'Bearer '+ localStorage.getItem('token')
            })
        });
    }

    SaveSynonym(word: string, synonym: string) {
        const body = {
            word: word,
            synonym: synonym
        };
        return this.http.post(environment.NodeJSUrl + "synonyms/", body,{
            headers: new HttpHeaders({
                Authorization: 'Bearer '+ localStorage.getItem('token')
            })
        });
    }

    DeleteSynonym(id: number) {
        return this.http.delete(environment.NodeJSUrl + "synonyms/" + id, {
            headers: new HttpHeaders({
                Authorization: 'Bearer '+ localStorage.getItem('token')
            })
        });
    }


}