import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import {Routes, RouterModule} from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { SavedDefinitionsComponent } from './components/pages/saved-definitions/saved-definitions.component';
import { SavedSynonymsComponent } from './components/pages/saved-synonyms/saved-synonyms.component';
import { SpellcheckComponent } from './components/pages/spellcheck/spellcheck.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthComponent } from './components/pages/auth/auth.component';
import { MatButtonModule } from '@angular/material/button';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AboutComponent } from './components/pages/about/about.component';

const appRoutes : Routes = [
  {path: 'saved-definitions', component: SavedDefinitionsComponent}, 
  {path: 'saved-synonyms', component: SavedSynonymsComponent}, 
  {path: 'spellcheck', component: SpellcheckComponent}, 
  {path: '', component: HomeComponent}, 
  {path: 'auth', component: AuthComponent}, 
  {path: 'about', component: AboutComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', redirectTo: 'not-found'}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationBarComponent,
    HomeComponent,
    SavedDefinitionsComponent,
    SavedSynonymsComponent,
    SpellcheckComponent,
    AuthComponent,
    NotFoundComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatIconModule,
    HttpClientModule,
    MatTooltipModule,
    MatButtonModule
  ],
  exports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
