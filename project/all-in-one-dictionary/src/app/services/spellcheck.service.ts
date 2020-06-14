import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpellcheckResponse } from '../models/spellcheck/SpellcheckResponse.model';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class SpellcheckService {
    constructor(private http: HttpClient) {}

    CheckText(text: string): Observable<SpellcheckResponse> {
        return this.http.get<SpellcheckResponse>(environment.SpellCheckUrl,
        {
            headers: new HttpHeaders({
                'x-rapidapi-host': 'montanaflynn-spellcheck.p.rapidapi.com',
                'x-rapidapi-key': '0440ffb3b5msh31f194ee363852fp13e7bdjsndeacfeb78db4',
            }),
            params: {
                'text': text
            }  
        });
    }
}