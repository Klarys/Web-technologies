import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpellcheckComponent } from './spellcheck.component';

describe('SpellcheckComponent', () => {
  let component: SpellcheckComponent;
  let fixture: ComponentFixture<SpellcheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpellcheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpellcheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
