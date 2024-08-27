import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRarezaComponent } from './card-rareza.component';

describe('CardRarezaComponent', () => {
  let component: CardRarezaComponent;
  let fixture: ComponentFixture<CardRarezaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardRarezaComponent]
    });
    fixture = TestBed.createComponent(CardRarezaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
