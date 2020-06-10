import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedDefinitionsComponent } from './saved-definitions.component';

describe('SavedDefinitionsComponent', () => {
  let component: SavedDefinitionsComponent;
  let fixture: ComponentFixture<SavedDefinitionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedDefinitionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedDefinitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
