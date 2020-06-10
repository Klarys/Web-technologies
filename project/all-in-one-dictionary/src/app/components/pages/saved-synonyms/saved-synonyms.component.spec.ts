import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedSynonymsComponent } from './saved-synonyms.component';

describe('SavedSynonymsComponent', () => {
  let component: SavedSynonymsComponent;
  let fixture: ComponentFixture<SavedSynonymsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedSynonymsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedSynonymsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
