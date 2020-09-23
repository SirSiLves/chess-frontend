import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PawnChangerComponent } from './pawn-changer.component';

describe('PawnChangerComponent', () => {
  let component: PawnChangerComponent;
  let fixture: ComponentFixture<PawnChangerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PawnChangerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PawnChangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
