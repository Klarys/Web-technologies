import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import {Routes, RouterModule} from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './components/pages/home/home.component';
import { SavedDefinitionsComponent } from './components/pages/saved-definitions/saved-definitions.component';
import { SavedSynonymsComponent } from './components/pages/saved-synonyms/saved-synonyms.component';
import { SpellcheckComponent } from './components/pages/spellcheck/spellcheck.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';

const appRoutes : Routes = [
  {path: 'saved-definitions', component: SavedDefinitionsComponent}, 
  {path: 'saved-synonyms', component: SavedSynonymsComponent}, 
  {path: 'spellcheck', component: SpellcheckComponent}, 
  {path: '', component: HomeComponent}, 
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationBarComponent,
    SidebarComponent,
    HomeComponent,
    SavedDefinitionsComponent,
    SavedSynonymsComponent,
    SpellcheckComponent,
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
    MatIconModule
  ],
  exports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
